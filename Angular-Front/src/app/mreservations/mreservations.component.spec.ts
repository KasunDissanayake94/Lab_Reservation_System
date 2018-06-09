import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MreservationsComponent } from './mreservations.component';

describe('MreservationsComponent', () => {
  let component: MreservationsComponent;
  let fixture: ComponentFixture<MreservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MreservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
