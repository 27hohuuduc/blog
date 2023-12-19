import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleaComponent } from './modulea.component';

describe('ModuleaComponent', () => {
  let component: ModuleaComponent;
  let fixture: ComponentFixture<ModuleaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleaComponent]
    });
    fixture = TestBed.createComponent(ModuleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
