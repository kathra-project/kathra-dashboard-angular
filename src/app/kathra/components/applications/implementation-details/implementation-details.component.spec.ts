import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationDetailsComponent } from './implementation-details.component';

describe('ImplementationDetailsComponent', () => {
  let component: ImplementationDetailsComponent;
  let fixture: ComponentFixture<ImplementationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplementationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
