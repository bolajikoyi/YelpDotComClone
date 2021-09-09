import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() set searchResult(val: any) {
    this.searchResult$.next(val ? val.results : []);
  }
  search: string = 'Search result shows here';
  ngOnInit(): void {}
  public searchResult$ = new ReplaySubject<any[]>();
  apiKey = environment.googleApiKey;
  constructor() {}
}
