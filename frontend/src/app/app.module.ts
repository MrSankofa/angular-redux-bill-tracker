import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { billsReducer } from './reducers/bills.reducer';
import { BillsComponent } from './bills/bills.component';
import { BillService } from './services/bill.service';
import { EffectsModule } from '@ngrx/effects';
import { BillEffects } from './effects/bill.effects';


@NgModule({
  declarations: [
    AppComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgRx Store setup with reducer
    StoreModule.forRoot({ bills: billsReducer }),
    EffectsModule.forRoot([BillEffects])
  ],
  providers: [ BillService],
  bootstrap: [AppComponent],
})
export class AppModule { }