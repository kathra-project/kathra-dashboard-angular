import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineWidgetComponent } from './pipeline-widget.component';

describe('PipelineWidgetComponent', () => {
  let component: PipelineWidgetComponent;
  let fixture: ComponentFixture<PipelineWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
