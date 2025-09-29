import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SollicitationComponent } from './sollicitation.component';

describe('SollicitationComponent', () => {
  let component: SollicitationComponent;
  let fixture: ComponentFixture<SollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
