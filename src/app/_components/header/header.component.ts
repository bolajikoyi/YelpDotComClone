import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() itemType: EventEmitter<string> = new EventEmitter();
  @Output() place: EventEmitter<string> = new EventEmitter();

  itemType$ = new ReplaySubject();
  place$ = new ReplaySubject();

  searchItem = '';
  searchCity = '';

  constructor() {}

  ngOnInit(): void {
    //we want to subscribe to the observable only once.
    this.itemType$.pipe(debounceTime(1000)).subscribe((res: any) => {
      return this.itemType.emit(res);
    });
    this.place$.pipe(debounceTime(1000)).subscribe((res: any) => {
      return this.place.emit(res);
    });
  }

  searchType() {
    this.itemType$.next(this.searchItem);
  }
  searchPlace() {
    this.place$.next(this.searchCity);
  }
  searchButton() {
    this.itemType$.next(this.searchItem);
    this.place$.next(this.searchCity);
  }
}
