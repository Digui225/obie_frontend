import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartRevenuComponent } from './basic-chart-revenu.component';

describe('BasicChartRevenuComponent', () => {
  let component: BasicChartRevenuComponent;
  let fixture: ComponentFixture<BasicChartRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChartRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicChartRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
