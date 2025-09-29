import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicchartComponent } from './basicChart.component';

describe('BasicchartComponent', () => {
  let component: BasicchartComponent;
  let fixture: ComponentFixture<BasicchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
