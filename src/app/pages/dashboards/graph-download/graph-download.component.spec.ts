import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDownloadComponent } from './graph-download.component';

describe('GraphDownloadComponent', () => {
  let component: GraphDownloadComponent;
  let fixture: ComponentFixture<GraphDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
