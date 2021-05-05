import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayBoxComponent } from './overlay-box.component';

describe('OverlayBoxComponent', () => {
  let component: OverlayBoxComponent;
  let fixture: ComponentFixture<OverlayBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
