import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCreatorComponent } from './set-creator.component';

describe('SetCreatorComponent', () => {
  let component: SetCreatorComponent;
  let fixture: ComponentFixture<SetCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
