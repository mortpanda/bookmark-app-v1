import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallscreenNavComponent } from './smallscreen-nav.component';

describe('SmallscreenNavComponent', () => {
  let component: SmallscreenNavComponent;
  let fixture: ComponentFixture<SmallscreenNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallscreenNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallscreenNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
