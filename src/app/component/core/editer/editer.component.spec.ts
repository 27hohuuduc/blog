import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerComponent } from './editer.component';

describe('EditerComponent', () => {
  let component: EditerComponent;
  let fixture: ComponentFixture<EditerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditerComponent]
    });
    fixture = TestBed.createComponent(EditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
