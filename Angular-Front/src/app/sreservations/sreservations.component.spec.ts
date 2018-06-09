import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SreservationsComponent } from './sreservations.component';

describe('SreservationsComponent', () => {
  let component: SreservationsComponent;
  let fixture: ComponentFixture<SreservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SreservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
