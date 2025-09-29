import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSollComponent } from './detail-soll.component';

describe('DetailSollComponent', () => {
  let component: DetailSollComponent;
  let fixture: ComponentFixture<DetailSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
