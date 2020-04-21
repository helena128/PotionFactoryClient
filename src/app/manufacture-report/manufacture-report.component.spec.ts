import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureReportComponent } from './manufacture-report.component';

describe('ManufactureReportComponent', () => {
  let component: ManufactureReportComponent;
  let fixture: ComponentFixture<ManufactureReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
