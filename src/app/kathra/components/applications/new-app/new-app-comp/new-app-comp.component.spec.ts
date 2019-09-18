import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppCompComponent } from './new-app-comp.component';

describe('NewAppCompComponent', () => {
  let component: NewAppCompComponent;
  let fixture: ComponentFixture<NewAppCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
