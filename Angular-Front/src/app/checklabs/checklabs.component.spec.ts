import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklabsComponent } from './checklabs.component';

describe('ChecklabsComponent', () => {
  let component: ChecklabsComponent;
  let fixture: ComponentFixture<ChecklabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
