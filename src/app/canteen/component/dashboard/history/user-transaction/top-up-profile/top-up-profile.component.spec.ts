import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpProfileComponent } from './top-up-profile.component';

describe('TopUpProfileComponent', () => {
  let component: TopUpProfileComponent;
  let fixture: ComponentFixture<TopUpProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUpProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
