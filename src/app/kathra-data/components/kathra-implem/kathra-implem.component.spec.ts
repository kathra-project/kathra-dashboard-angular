import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KathraImplemComponent } from './kathra-implem.component';

describe('KathraImplemComponent', () => {
  let component: KathraImplemComponent;
  let fixture: ComponentFixture<KathraImplemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraImplemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraImplemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
