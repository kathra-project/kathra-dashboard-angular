import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraComponent } from './kathra.component';

describe('KathraComponent', () => {
  let component: KathraComponent;
  let fixture: ComponentFixture<KathraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
