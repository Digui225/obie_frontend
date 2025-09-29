import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombochartEnergieComponent } from './combochart-energie.component';

describe('CombochartEnergieComponent', () => {
  let component: CombochartEnergieComponent;
  let fixture: ComponentFixture<CombochartEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombochartEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombochartEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
