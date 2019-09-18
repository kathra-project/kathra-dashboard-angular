import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraEnvComponent } from './kathra-env.component';

describe('KathraEnvComponent', () => {
  let component: KathraEnvComponent;
  let fixture: ComponentFixture<KathraEnvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraEnvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
