import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-icon-card',
    styleUrls: ['./icon-card.component.scss'],
    templateUrl: './icon-card.component.html',
})
export class IconCardComponent {

    @Input() title: string;
    @Input() type: string;
    @Input() detail: string;
}
