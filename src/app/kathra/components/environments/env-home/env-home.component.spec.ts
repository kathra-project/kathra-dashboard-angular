import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvHomeComponent } from './env-home.component';

describe('EnvHomeComponent', () => {
  let component: EnvHomeComponent;
  let fixture: ComponentFixture<EnvHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
