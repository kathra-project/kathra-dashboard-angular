import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraCompComponent } from './kathra-comp.component';

describe('KathraCompComponent', () => {
  let component: KathraCompComponent;
  let fixture: ComponentFixture<KathraCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
