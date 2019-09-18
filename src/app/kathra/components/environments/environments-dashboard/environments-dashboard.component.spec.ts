import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentsDashboardComponent } from './environments-dashboard.component';

describe('EnvironmentsDashboardComponent', () => {
  let component: EnvironmentsDashboardComponent;
  let fixture: ComponentFixture<EnvironmentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
