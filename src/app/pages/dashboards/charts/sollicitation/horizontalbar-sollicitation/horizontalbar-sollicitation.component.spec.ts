import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalbarSollicitationComponent } from './horizontalbar-sollicitation.component';

describe('HorizontalbarSollicitationComponent', () => {
  let component: HorizontalbarSollicitationComponent;
  let fixture: ComponentFixture<HorizontalbarSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalbarSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalbarSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
