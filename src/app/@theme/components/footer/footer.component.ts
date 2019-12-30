import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span>Created with ♥ by <b>Bibash</b> {{currentYear}}</span>
  `,
})
export class FooterComponent implements OnInit {
  currentYear: string;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
