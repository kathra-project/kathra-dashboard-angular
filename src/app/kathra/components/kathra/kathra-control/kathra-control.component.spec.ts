import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraControlComponent } from './kathra-control.component';

describe('KathraControlComponent', () => {
  let component: KathraControlComponent;
  let fixture: ComponentFixture<KathraControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
