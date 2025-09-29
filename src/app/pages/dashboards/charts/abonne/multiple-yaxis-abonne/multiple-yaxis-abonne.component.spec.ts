import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleYaxisAbonneComponent } from './multiple-yaxis-abonne.component';

describe('MultipleYaxisAbonneComponent', () => {
  let component: MultipleYaxisAbonneComponent;
  let fixture: ComponentFixture<MultipleYaxisAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleYaxisAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleYaxisAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
