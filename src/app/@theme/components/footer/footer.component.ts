import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="row text-center">
      <i>Created with ♥ by <a href="https://www.facebook.com/sammar.ronaldo"> <b>Bibash</b> </a> {{currentYear}}</i>
    </div>
  `,
})
export class FooterComponent implements OnInit {
  currentYear: string;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
