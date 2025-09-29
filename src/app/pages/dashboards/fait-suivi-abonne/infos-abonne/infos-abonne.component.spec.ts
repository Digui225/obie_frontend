import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosAbonneComponent } from './infos-abonne.component';

describe('InfosAbonneComponent', () => {
  let component: InfosAbonneComponent;
  let fixture: ComponentFixture<InfosAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
