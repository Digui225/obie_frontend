import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalbarAbonneComponent } from './horizontalbar-abonne.component';

describe('HorizontalbarAbonneComponent', () => {
  let component: HorizontalbarAbonneComponent;
  let fixture: ComponentFixture<HorizontalbarAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalbarAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalbarAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
