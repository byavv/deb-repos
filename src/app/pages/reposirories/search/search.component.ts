import {Component} from '@angular/core';


import { AutoComplete } from './auto-complete/auto-complete.component';
import { Aggregations } from './aggregations/aggregations.component';
import { IPackages, IAggs, PackagesService } from '../../../shared/services/ElasticSearch/Packages.service';
import  { IAggsFilter } from './aggregations/aggregations.component';

@Component({
    selector: 'search',
    styles: [require('./search.scss')],
    template: require('./search.html')
})


export class Search {

    status: boolean;
    repos:any;
    aggs: IAggs;

    search_aggs: IAggsFilter;
    search_query: string;
    size: number;
    //is_fetching_state: boolean;

    constructor(private _es: PackagesService) {}

    private _search() {
        const filter = this.search_aggs || <IAggsFilter>{};

        this._es.search({
            q: this.search_query,
            size: this.size,
            repo: filter.repo,
            name: filter.name
        }).then(({chunk, aggs}) => {

            //this.is_fetching_state = false;
            this.repos = aggs.repos;
            this.aggs = aggs;

            //console.log(chunk, aggs);

        }).catch(e => console.log(e));
    }

    public ngAfterViewInit():void {}

    handleQuery(query? : string, size?: number) {
        this.search_query = query;
        this.size = size;
        this._search();
    }

    ngOnInit() {
        this.handleQuery();
    }


    //фильтры для поиска
    handleAggs(filter : IAggsFilter) {
        this.search_aggs = filter;
        this.handleQuery(this.search_query, 100);
    }
}