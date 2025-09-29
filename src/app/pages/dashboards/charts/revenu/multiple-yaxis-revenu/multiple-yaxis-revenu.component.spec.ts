import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleYaxisRevenuComponent } from './multiple-yaxis-revenu.component';

describe('MultipleYaxisRevenuComponent', () => {
  let component: MultipleYaxisRevenuComponent;
  let fixture: ComponentFixture<MultipleYaxisRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleYaxisRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleYaxisRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
