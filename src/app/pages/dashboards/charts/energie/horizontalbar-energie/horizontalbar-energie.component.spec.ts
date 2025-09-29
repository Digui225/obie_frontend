import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalbarEnergieComponent } from './horizontalbar-energie.component';

describe('HorizontalbarEnergieComponent', () => {
  let component: HorizontalbarEnergieComponent;
  let fixture: ComponentFixture<HorizontalbarEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalbarEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalbarEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
