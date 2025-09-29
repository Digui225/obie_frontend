import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartEnergieComponent } from './piechart-energie.component';

describe('PiechartEnergieComponent', () => {
  let component: PiechartEnergieComponent;
  let fixture: ComponentFixture<PiechartEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
