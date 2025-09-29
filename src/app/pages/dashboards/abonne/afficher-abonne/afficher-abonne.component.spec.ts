import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherAbonneComponent } from './afficher-abonne.component';

describe('AfficherAbonneComponent', () => {
  let component: AfficherAbonneComponent;
  let fixture: ComponentFixture<AfficherAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
