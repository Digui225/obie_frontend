import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column100ChartRevenuComponent } from './column100-chart-revenu.component';

describe('Column100ChartRevenuComponent', () => {
  let component: Column100ChartRevenuComponent;
  let fixture: ComponentFixture<Column100ChartRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Column100ChartRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Column100ChartRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
