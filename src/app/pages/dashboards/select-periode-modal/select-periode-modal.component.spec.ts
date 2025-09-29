import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPeriodeModalComponent } from './select-periode-modal.component';

describe('SelectPeriodeModalComponent', () => {
  let component: SelectPeriodeModalComponent;
  let fixture: ComponentFixture<SelectPeriodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPeriodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPeriodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
