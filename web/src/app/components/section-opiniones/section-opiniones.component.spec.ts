import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOpinionesComponent } from './section-opiniones.component';

describe('SectionOpinionesComponent', () => {
  let component: SectionOpinionesComponent;
  let fixture: ComponentFixture<SectionOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionOpinionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
