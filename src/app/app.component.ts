import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
  menuList$ = new ReplaySubject<string>();
  year$ = new ReplaySubject<number>();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.filter$.subscribe((val) => {
      this.filter = val ? val : '';
    });
    this.year$.next(new Date().getFullYear());
  }

  yelpDataOutput(event: any) {
    this.searchItem = event.trim();
    this.search();
  }
  cityName(event: any) {
    this.searchCity = event.trim();
    this.search();
  }
  filterFunction(filterText: string) {
    this.filter$.next(filterText);
    let url = `${environment.CORS}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.searchItem}+in+${this.searchCity}&type=${filterText}&key=${environment.googleApiKey}`;
    return this.http.get(url).subscribe((data) => {
      this.data$.next(data);
    });
  }

  //https://cor5allow.herokuapp.com/ is used to grant cors access. Here, we are accessing it from the environments file (i.e. environment.CORS).
  search() {
    let url = `${environment.CORS}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.searchItem}+in+${this.searchCity}&key=${environment.googleApiKey}`;
    return this.http.get(url).subscribe((data: any) => {
      this.data$.next(data);
      console.log(data);
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
  menuFxn(item: string) {
    // the string value is taken from the function on click event, and it is saved in an observable ( i.e. replaysubject)
    this.menuList$.next(item);
  }
}
