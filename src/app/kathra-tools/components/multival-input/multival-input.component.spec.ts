import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivalInputComponent } from './multival-input.component';

describe('MultivalInputComponent', () => {
  let component: MultivalInputComponent;
  let fixture: ComponentFixture<MultivalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultivalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
