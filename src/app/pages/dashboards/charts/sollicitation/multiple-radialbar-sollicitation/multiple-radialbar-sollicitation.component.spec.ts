import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadialbarSollicitationComponent } from './multiple-radialbar-sollicitation.component';

describe('MultipleRadialbarSollicitationComponent', () => {
  let component: MultipleRadialbarSollicitationComponent;
  let fixture: ComponentFixture<MultipleRadialbarSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRadialbarSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRadialbarSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
