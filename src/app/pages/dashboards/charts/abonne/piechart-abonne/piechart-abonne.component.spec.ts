import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartAbonneComponent } from './piechart-abonne.component';

describe('PiechartAbonneComponent', () => {
  let component: PiechartAbonneComponent;
  let fixture: ComponentFixture<PiechartAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
