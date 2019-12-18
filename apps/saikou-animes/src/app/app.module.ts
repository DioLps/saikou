import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimesComponent } from './animes/animes.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimesService } from './animes/animes.service';

@NgModule({
  declarations: [
    AppComponent,
    AnimesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AnimesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
