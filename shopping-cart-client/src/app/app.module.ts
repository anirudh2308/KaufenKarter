import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./shared/material/material.module";
import { NgxPayPalModule } from "ngx-paypal";
import { ChartsModule } from "ng2-charts";
import { Ng9OdometerModule } from "ng9-odometer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule,
    Ng9OdometerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
