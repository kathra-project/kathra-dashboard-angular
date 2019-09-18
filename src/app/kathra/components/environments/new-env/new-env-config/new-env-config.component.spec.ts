import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnvConfigComponent } from './new-env-config.component';

describe('NewEnvConfigComponent', () => {
  let component: NewEnvConfigComponent;
  let fixture: ComponentFixture<NewEnvConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnvConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnvConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
