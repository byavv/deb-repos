import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef} from '@angular/core';
import { PackagesService, IPackages, ISearchArg } from '../../../../shared/services/ElasticSearch/Packages.service';
import { Subject }        from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'auto-complete',
    styles: [require('./auto-complete.scss')],
    template: require('./auto-complete.component.html')
})

export class AutoComplete implements OnInit{

    packages: Observable<IPackages[]>;
    searchSubject = new Subject<string>();
    suggestions: string[];
    search: ISearchArg;
    @ViewChild('repl') private replRef;
    @Output() q_change = new EventEmitter<string>();

    constructor(private _es: PackagesService) {}

    // Push a search term into the observable stream.
    search(term: string) {
        this.searchSubject.next(term); }


    ngOnInit() {
        this.packages = this.searchSubject
            .asObservable()           // cast as Observable
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(q => q
                ? this._es.suggest(q).catch(e => Promise.resolve([]))
                : Promise.resolve([]))
            .subscribe(suggestions => {
                this.suggestions = suggestions;

                console.log(' this.suggestions',  this.suggestions);

            });

    }


    private _cleanSuggest(){
        this.suggestions = [];
        this.searchSubject.next('');
    }


    handleQuery(val:string){
        document.querySelector('input').value = val;
        this.q_change.emit(val);
        this._cleanSuggest();
    }

    selectQuery(sugg:string){
        this.handleQuery(sugg);
    }


    private isEventInsideElement(event:Event, child:ElementRef) : boolean {
        return child.nativeElement.contains(event.target);
    }

    handleClick(event:MouseEvent) {
        if (!this.isEventInsideElement(event, this.replRef)) {
            this._cleanSuggest();
        }
    }
}