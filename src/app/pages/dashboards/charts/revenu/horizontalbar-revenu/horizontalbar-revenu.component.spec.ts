import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalbarRevenuComponent } from './horizontalbar-revenu.component';

describe('HorizontalbarRevenuComponent', () => {
  let component: HorizontalbarRevenuComponent;
  let fixture: ComponentFixture<HorizontalbarRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalbarRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalbarRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
