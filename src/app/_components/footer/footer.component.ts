import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  fullYear$ = new ReplaySubject<number>();

  constructor() {}

  ngOnInit(): void {
    this.fullYear$.next(new Date().getFullYear());
  }
}
