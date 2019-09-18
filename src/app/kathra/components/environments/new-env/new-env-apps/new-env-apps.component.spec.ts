import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnvAppsComponent } from './new-env-apps.component';

describe('NewEnvAppsComponent', () => {
  let component: NewEnvAppsComponent;
  let fixture: ComponentFixture<NewEnvAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnvAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnvAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
