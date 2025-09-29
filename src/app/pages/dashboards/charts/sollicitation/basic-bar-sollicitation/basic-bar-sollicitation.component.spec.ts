import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBarSollicitationComponent } from './basic-bar-sollicitation.component';

describe('BasicBarSollicitationComponent', () => {
  let component: BasicBarSollicitationComponent;
  let fixture: ComponentFixture<BasicBarSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBarSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBarSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
