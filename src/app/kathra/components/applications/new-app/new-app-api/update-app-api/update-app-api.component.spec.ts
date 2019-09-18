import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppApiComponent } from './update-app-api.component';

describe('UpdateAppApiComponent', () => {
  let component: UpdateAppApiComponent;
  let fixture: ComponentFixture<UpdateAppApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAppApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
