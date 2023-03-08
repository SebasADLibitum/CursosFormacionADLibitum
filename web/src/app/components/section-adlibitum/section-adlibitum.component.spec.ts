import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAdlibitumComponent } from './section-adlibitum.component';

describe('SectionAdlibitumComponent', () => {
  let component: SectionAdlibitumComponent;
  let fixture: ComponentFixture<SectionAdlibitumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAdlibitumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAdlibitumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
