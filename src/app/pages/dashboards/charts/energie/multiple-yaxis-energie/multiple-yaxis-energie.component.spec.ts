import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleYaxisEnergieComponent } from './multiple-yaxis-energie.component';

describe('MultipleYaxisEnergieComponent', () => {
  let component: MultipleYaxisEnergieComponent;
  let fixture: ComponentFixture<MultipleYaxisEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleYaxisEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleYaxisEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
