import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartRevenuComponent } from './piechart-revenu.component';

describe('PiechartRevenuComponent', () => {
  let component: PiechartRevenuComponent;
  let fixture: ComponentFixture<PiechartRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
