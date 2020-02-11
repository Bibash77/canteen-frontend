import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransactionComponent } from './user-transaction.component';

describe('UserTransactionComponent', () => {
  let component: UserTransactionComponent;
  let fixture: ComponentFixture<UserTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
