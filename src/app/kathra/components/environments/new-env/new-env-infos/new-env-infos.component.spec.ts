import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnvInfosComponent } from './new-env-infos.component';

describe('NewEnvInfosComponent', () => {
  let component: NewEnvInfosComponent;
  let fixture: ComponentFixture<NewEnvInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnvInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnvInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
