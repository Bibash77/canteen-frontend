import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
      <div class="justify-content-center">
        <i>Created with ♥ by <a href="https://www.instagram.com/rockyrikesh/"> <b>Bibash Bogati</b>
          <a href="https://www.instagram.com/rockyrikesh/"><nb-icon icon="cast-outline"></nb-icon></a>
          <a href="https://www.facebook.com/sammar.ronaldo"><nb-icon icon="facebook-outline"></nb-icon></a>
        </a></i>
      </div>
  `,
})
export class FooterComponent implements OnInit {
  currentYear: string;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
