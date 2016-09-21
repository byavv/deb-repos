import { Injectable } from '@angular/core';
import * as elasticsearch from "elasticsearch";
import { Client } from "elasticsearch";
import 'rxjs/add/operator/toPromise';
import { Http, URLSearchParams } from '@angular/http';
import {HOST}  from '../../../../../config/elastic';


//поля проиндексированного документа в еластике
export interface IPackages {
    name: string;
    changes: string;
    version: string;
    repo: string;
    files:string[];
}

//возвращает еластик
export interface IChunk<T> {
    items: T[];
    total: number;
}

//интерфейс для Aggregations
export interface IAggs {
    names: Array<{name:string; doc_count:number}>;
    repos: Array<{name:string; doc_count:number}>;
}


//описываем что мы ищем
export interface ISearchArg {
    q?: string;
    size?:number; // если не указывать вернет только агрегирование
    fields?:string[]; //по каким полям ищем
    repo?: string;
    name?: string;
    /*files: string[];*/
}



const ELASTIC_URL = '//' + HOST.connention.host + '/' + HOST.indeces.packages + '/';

@Injectable()
export class PackagesService {

    //private _client: elasticsearch.ClientInterface;
    //private _type = HOST.indeces.packages;


    constructor(private _http : Http){}



    //для autocomplete
    suggest(str:string, size:number=10) : Promise<string[]>{

        let params = new URLSearchParams();
        params.set('source', JSON.stringify({
            "size":size,
            "fields":["name"],
            "query": {
                "function_score": {
                    "filter": {
                        "term": { "sort_name": str }
                    }
                }
            },
            "aggs": {
                "names" : {
                    "terms" : {
                        "field" : "name",
                        "size": 100,
                        "order" : { "_count" : "asc" }
                    }
                }
            }
        }));

        return this._http
            .get(ELASTIC_URL + 'deb/_search', { search: params })
            .toPromise()
            .then(response => {
                let sug = response.json();
                let options = sug.aggregations.names.buckets.map(y => {
                    return {
                        doc_count: y.doc_count,
                        name: y.key
                    }
                });

                return options;
            });
    }

    //общий метод
    search(args? : ISearchArg) : Promise<{chunk:IChunk<IPackages>; aggs:IAggs;}> {
        let coreDefs : ISearchArg = {
             fields: ["name"]
        };
        args = Object.assign(coreDefs, args);

        let params = new URLSearchParams();
        // Elastic docs:
        // For libraries that don’t accept a request body
        // for non-POST requests, you can pass the request
        // body as the source query string parameter instead.
        params.set('source', JSON.stringify({
            "size" : args.size ? args.size  : 0,

            "fields" : [
                "repo", "changes", "name", "version"/*, "files"*/],
            "query" : {
                "bool": {
                    "must": [
                        args.q
                            ? { "query_string" : {
                            "query": args.q,
                            "fields": args.fields,
                            "default_operator": "or"
                            }
                        }
                        : { "match_all": {} },
                    ],
                    "filter": [
                        args.repo
                            ? {
                            "match": {
                                "repo": args.repo
                            }
                        } : null,
                        args.name
                            ? {
                            "match": {
                                "name": args.name
                            }
                        } : null,

                    ].filter(v => v !== null)
                }
            },

            "sort" : [
                {"repo" : {"order" : "asc"} }
            ],
            "aggs": {
                "repos" : {
                    "terms" : {
                        "field" : "repo",
                        "size": 100,
                        "order" : { "_count" : "asc" }
                    }
                },
                "names" : {
                    "terms" : {
                        "field" : "name",
                        "size": 100,
                        "order" : { "_count" : "asc" }
                    }
                }
            }
        }));

        return this._http
        .get(ELASTIC_URL + 'deb/_search', { search: params })
        .toPromise()
        .then(response => {
            const { hits, aggregations } = response.json();

            const chunk : IChunk<IPackages> = {
                items: hits.hits.map(
                    hit => Object.assign(hit.fields)),
                total: hits.total,
                repoes: hits.hits.map(
                    repo => Object.assign(repo.fields.repo)),
            };

            const aggs : IAggs = {
                repos: aggregations.repos.buckets.map(y => {
                    return {
                        doc_count: y.doc_count,
                        name: y.key
                    }
                }),
                names: aggregations.names.buckets.map(n => {
                    return {
                        vers_count: n.doc_count,
                        name: n.key
                    }
                }),
            };

            return {chunk, aggs};
        });
    }

}