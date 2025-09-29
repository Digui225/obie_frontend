import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonneListComponent } from './abonne-list.component';

describe('AbonneListComponent', () => {
  let component: AbonneListComponent;
  let fixture: ComponentFixture<AbonneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
