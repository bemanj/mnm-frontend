import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductV2Component } from './select-product-v2.component';

describe('SelectProductV2Component', () => {
  let component: SelectProductV2Component;
  let fixture: ComponentFixture<SelectProductV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
