import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleYAxisChartComponent } from './multiple-yaxis-chart.component';

describe('MultipleYAxisChartComponent', () => {
  let component: MultipleYAxisChartComponent;
  let fixture: ComponentFixture<MultipleYAxisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleYAxisChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleYAxisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
