import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { IAggs } from '../../../../shared/services/ElasticSearch/Packages.service';

export class IAggsFilter {
    repo: string;
    name: string;
}

@Component({
    selector: 'aggregations',
    /*host: {
     '(document:click)': 'handleClick($event)',
     },*/
    styles: [require('./aggregations.scss')],
    template: require('./aggregations.component.html')
})

export class Aggregations {
    aggs:IAggs;
    search_repos: string;
    search_names: string;
    isActive:boolean;
    @Output() select:string;
    @ViewChild('options') private optRef;


    @Output() aggs_change = new EventEmitter<IAggsFilter>();

    @Input() set data(aggs : IAggs) {

        if (!aggs) return;

        if (this.search_repos && aggs.repos.length === 0) {
            aggs.repos = [{name: this.search_repos, doc_count: 0}];
        }
        if (this.search_names && aggs.names.length === 0) {
            aggs.names = [{name: this.search_names, doc_count: 0}];
        }

        this.aggs = aggs;
    }

    private _emit() {
        this.aggs_change.emit({
            repo: this.search_repos,
            name: this.search_names
        });
    }

    /*handleRepos(reps:string) {
     this.search_repos= reps;
     this._emit();
     }*/

    handleRepos() {
        this.search_repos= this.select;
        this._emit();
    }

    handleNames(pack:string) {
        this.search_names = pack;
        this._emit();
    }


    private isEventInsideElement(event:Event, child:ElementRef):boolean {
        return child.nativeElement.contains(event.target);
    }

    handleClick(event:MouseEvent) {
        if (this.isEventInsideElement(event, this.optRef)) {
            document.getElementsByClassName('select')[0].textContent =(<HTMLElement>event.target).dataset['val'];
            this.select = (<HTMLElement>event.target).dataset['val'];
            this.handleRepos();
        }
        this.isActive = (this.isActive) ? false : true;
    }

}
