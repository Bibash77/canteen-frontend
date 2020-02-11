import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="offset-5">Created with ♥ by <a href="https://www.facebook.com/sammar.ronaldo"> <b>Bibash</b> </a> {{currentYear}}</span>
  `,
})
export class FooterComponent implements OnInit {
  currentYear: string;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
