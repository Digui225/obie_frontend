import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartSollicitationComponent } from './piechart-sollicitation.component';

describe('PiechartSollicitationComponent', () => {
  let component: PiechartSollicitationComponent;
  let fixture: ComponentFixture<PiechartSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
