import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column100ChartComponent } from './column100-chart.component';

describe('Column100ChartComponent', () => {
  let component: Column100ChartComponent;
  let fixture: ComponentFixture<Column100ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Column100ChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Column100ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
