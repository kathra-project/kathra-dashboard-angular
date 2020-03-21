import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCatalogEntryComponent } from './new-catalogentry.component';

describe('NewAppComponent', () => {
  let component: NewCatalogEntryComponent;
  let fixture: ComponentFixture<NewCatalogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCatalogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCatalogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
