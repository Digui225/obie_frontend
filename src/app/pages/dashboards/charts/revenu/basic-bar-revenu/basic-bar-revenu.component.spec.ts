import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBarRevenuComponent } from './basic-bar-revenu.component';

describe('BasicBarRevenuComponent', () => {
  let component: BasicBarRevenuComponent;
  let fixture: ComponentFixture<BasicBarRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBarRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBarRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
