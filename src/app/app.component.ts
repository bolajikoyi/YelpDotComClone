import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yelpclone';
  searchItem = '';
  searchCity = '';
  filter = '';
  data$ = new ReplaySubject();
  category$ = new ReplaySubject<string[]>();
  filter$ = new ReplaySubject<string>();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.filter$.subscribe((val) => {
      this.filter = val ? val : '';
    });
  }

  yelpDataOutput(event: any) {
    this.searchItem = event.trim();
    this.search();
  }
  cityName(event: any) {
    this.searchCity = event.trim();
    this.search();
  }
  filterFunction(event: string) {
    this.filter$.next(event);
    let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.searchItem}+in+${this.searchCity}&type=${event}&key=${environment.googleApiKey}`;
    return this.http.get(url).subscribe((data) => {
      this.data$.next(data);
    });
  }
  //https://cors-anywhere.herokuapp.com/corsdemo
  //visit the above url to grant cors permission.
  search() {
    let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.searchItem}+in+${this.searchCity}&key=${environment.googleApiKey}`;
    return this.http.get(url).subscribe((data: any) => {
      this.data$.next(data);
      //empty array to save the types
      let types = [];
      //for loop to iterate over the results from the api
      for (let category of data.results) {
        types.push(...category.types);
        //using lodash to get the unique contents in type array
        let uniqCategory = _.uniq(types);
        this.category$.next(uniqCategory);
      }
    });
  }
}
