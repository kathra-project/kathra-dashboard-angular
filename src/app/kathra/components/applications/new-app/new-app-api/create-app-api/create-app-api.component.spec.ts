import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppApiComponent } from './new-app-api.component';

describe('CreateAppApiComponent', () => {
  let component: CreateAppApiComponent;
  let fixture: ComponentFixture<CreateAppApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
