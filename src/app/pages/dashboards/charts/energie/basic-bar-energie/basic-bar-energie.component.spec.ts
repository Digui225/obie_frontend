import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBarEnergieComponent } from './basic-bar-energie.component';

describe('BasicBarEnergieComponent', () => {
  let component: BasicBarEnergieComponent;
  let fixture: ComponentFixture<BasicBarEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBarEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBarEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
