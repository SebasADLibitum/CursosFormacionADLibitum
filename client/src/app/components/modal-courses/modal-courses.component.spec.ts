import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoursesComponent } from './modal-courses.component';

describe('ModalCoursesComponent', () => {
  let component: ModalCoursesComponent;
  let fixture: ComponentFixture<ModalCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
