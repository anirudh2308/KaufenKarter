import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificproductComponent } from './specificproduct.component';

describe('SpecificproductComponent', () => {
  let component: SpecificproductComponent;
  let fixture: ComponentFixture<SpecificproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
