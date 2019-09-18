import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceRepositoryWidgetComponent } from './source-repository-widget.component';

describe('SourceRepositoryWidgetComponent', () => {
  let component: SourceRepositoryWidgetComponent;
  let fixture: ComponentFixture<SourceRepositoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceRepositoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceRepositoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
