import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueExplorerComponent } from './catalogue-explorer.component';

describe('CatalogueExplorerComponent', () => {
  let component: CatalogueExplorerComponent;
  let fixture: ComponentFixture<CatalogueExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
