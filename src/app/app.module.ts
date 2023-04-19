import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolTipDirective } from './tooltip.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToolTipDirective,
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
