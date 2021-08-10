import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() set searchResult(val: any) {
    this.searchResult$.next(val ? val.results : []);

    // const rating =val.results.rating;
    // const arr:number[] =[]
    // for (let index = 1; index < Math.floor (rating); index++) {
    //   arr.push(1);
    // }

    // if(rating % Math.floor(rating)> 0){
    //   arr.push(0)
    // }
  }
  search: string = 'Search result shows here';
  ngOnInit(): void {}
  public searchResult$ = new ReplaySubject<any[]>();
  apiKey = 'AIzaSyD36Z7sXImc__tax_Z7GKa-dm2jnv550e8';
  constructor() {}
}
