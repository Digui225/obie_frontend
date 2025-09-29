import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitSuiviSollComponent } from './fait-suivi-soll.component';

describe('FaitSuiviSollComponent', () => {
  let component: FaitSuiviSollComponent;
  let fixture: ComponentFixture<FaitSuiviSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitSuiviSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaitSuiviSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
