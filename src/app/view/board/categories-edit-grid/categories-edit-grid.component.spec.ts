import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEditGridComponent } from './categories-edit-grid.component';

describe('CategoriesEditGridComponent', () => {
  let component: CategoriesEditGridComponent;
  let fixture: ComponentFixture<CategoriesEditGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesEditGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesEditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
