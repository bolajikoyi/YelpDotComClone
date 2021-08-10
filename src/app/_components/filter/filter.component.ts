import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() set category(val: any) {
    this.type$.next(val);
  }
  @Output() filterText = new EventEmitter();

  type$ = new ReplaySubject<string[]>();
  selected: string = '';

  constructor() {}

  ngOnInit(): void {}

  categoryFilter(event: string, id: any) {
    if (this.selected != id) {
      this.selected = id;
      this.filterText.emit(event);
    } else {
      this.selected = '';
      this.filterText.emit('');
    }
  }
}
