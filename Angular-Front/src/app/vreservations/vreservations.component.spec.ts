import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VreservationsComponent } from './vreservations.component';

describe('VreservationsComponent', () => {
  let component: VreservationsComponent;
  let fixture: ComponentFixture<VreservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VreservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
