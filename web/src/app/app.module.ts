import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SectionHomeComponent } from './components/section-home/section-home.component';
import { SectionAdlibitumComponent } from './components/section-adlibitum/section-adlibitum.component';
import { SectionCursosAbiertosComponent } from './components/section-cursos-abiertos/section-cursos-abiertos.component';
import { SectionCursosComponent } from './components/section-cursos/section-cursos.component';
import { SectionOpinionesComponent } from './components/section-opiniones/section-opiniones.component';
import { SectionContactoComponent } from './components/section-contacto/section-contacto.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SectionHomeComponent,
    SectionAdlibitumComponent,
    SectionCursosAbiertosComponent,
    SectionCursosComponent,
    SectionOpinionesComponent,
    SectionContactoComponent,
    SkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
