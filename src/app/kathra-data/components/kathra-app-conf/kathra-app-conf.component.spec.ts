import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KathraAppConfComponent } from './kathra-app-conf.component';

describe('KathraAppConfComponent', () => {
  let component: KathraAppConfComponent;
  let fixture: ComponentFixture<KathraAppConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KathraAppConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KathraAppConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
