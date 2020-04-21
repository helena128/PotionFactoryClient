import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsRequestComponent } from './ingredients-request.component';

describe('IngredientsRequestComponent', () => {
  let component: IngredientsRequestComponent;
  let fixture: ComponentFixture<IngredientsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
