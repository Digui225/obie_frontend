import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartStackRevenuComponent } from './piechart-stack-revenu.component';

describe('PiechartStackRevenuComponent', () => {
  let component: PiechartStackRevenuComponent;
  let fixture: ComponentFixture<PiechartStackRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartStackRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartStackRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
