import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCursosAbiertosComponent } from './section-cursos-abiertos.component';

describe('SectionCursosAbiertosComponent', () => {
  let component: SectionCursosAbiertosComponent;
  let fixture: ComponentFixture<SectionCursosAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCursosAbiertosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCursosAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
