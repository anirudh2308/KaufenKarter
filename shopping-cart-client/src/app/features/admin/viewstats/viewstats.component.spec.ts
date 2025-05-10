import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstatsComponent } from './viewstats.component';

describe('ViewstatsComponent', () => {
  let component: ViewstatsComponent;
  let fixture: ComponentFixture<ViewstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
