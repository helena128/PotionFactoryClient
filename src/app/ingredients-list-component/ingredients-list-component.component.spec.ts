import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListComponentComponent } from './ingredients-list-component.component';

describe('IngredientsListComponentComponent', () => {
  let component: IngredientsListComponentComponent;
  let fixture: ComponentFixture<IngredientsListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
