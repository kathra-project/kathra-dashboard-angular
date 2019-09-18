import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticritInputFilterComponent } from './multicrit-input-filter.component';

describe('MulticritInputFilterComponent', () => {
  let component: MulticritInputFilterComponent;
  let fixture: ComponentFixture<MulticritInputFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticritInputFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticritInputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
