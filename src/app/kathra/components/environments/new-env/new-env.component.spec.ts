import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnvComponent } from './new-env.component';

describe('NewEnvComponent', () => {
  let component: NewEnvComponent;
  let fixture: ComponentFixture<NewEnvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
