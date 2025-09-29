import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartSollicitationComponent } from './basic-chart-sollicitation.component';

describe('BasicChartSollicitationComponent', () => {
  let component: BasicChartSollicitationComponent;
  let fixture: ComponentFixture<BasicChartSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChartSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicChartSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
