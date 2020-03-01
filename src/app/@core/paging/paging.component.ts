import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pageable} from '../../canteen/component/modal/common-pageable';


@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
})
export class PagingComponent {

    @Input()
    pageable: Pageable;

    page = 1;

    @Output()
    changePage = new EventEmitter<number>();

    constructor() {
    }

    pageChanged(page: number) {
        this.page = page;
        this.changePage.emit(this.page);
    }

}
