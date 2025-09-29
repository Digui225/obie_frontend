import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndicEnergieComponent } from './select-indic-energie.component';

describe('SelectIndicEnergieComponent', () => {
  let component: SelectIndicEnergieComponent;
  let fixture: ComponentFixture<SelectIndicEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndicEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIndicEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
