import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContactoComponent } from './section-contacto.component';

describe('SectionContactoComponent', () => {
  let component: SectionContactoComponent;
  let fixture: ComponentFixture<SectionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
