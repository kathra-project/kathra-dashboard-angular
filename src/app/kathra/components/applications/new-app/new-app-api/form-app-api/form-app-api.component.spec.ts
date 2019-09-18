import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppApiComponent } from './form-app-api.component';

describe('FormAppApiComponent', () => {
  let component: FormAppApiComponent;
  let fixture: ComponentFixture<FormAppApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAppApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAppApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
