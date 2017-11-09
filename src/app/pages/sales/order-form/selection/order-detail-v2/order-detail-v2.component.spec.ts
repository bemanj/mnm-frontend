import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailV2Component } from './order-detail-v2.component';

describe('OrderDetailV2Component', () => {
  let component: OrderDetailV2Component;
  let fixture: ComponentFixture<OrderDetailV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
