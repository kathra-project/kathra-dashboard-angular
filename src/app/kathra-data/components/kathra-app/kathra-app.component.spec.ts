import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraAppComponent } from './kathra-app.component';

describe('ApplicationComponent', () => {
  let component: KathraAppComponent;
  let fixture: ComponentFixture<KathraAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
