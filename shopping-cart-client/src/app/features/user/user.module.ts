import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserdashboardComponent } from "./userdashboard/userdashboard.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../../shared/material/material.module";
import { ProductsComponent } from "./products/products.component";
import { OffersComponent } from "./offers/offers.component";
import { SpecificproductComponent } from "./specificproduct/specificproduct.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ThankspageComponent } from "./thankspage/thankspage.component";

import { NgxPayPalModule } from "ngx-paypal";
import { PastordersComponent } from './pastorders/pastorders.component';

@NgModule({
  declarations: [
    UserComponent,
    UserdashboardComponent,
    ProductsComponent,
    OffersComponent,
    SpecificproductComponent,
    CartComponent,
    CheckoutComponent,
    ThankspageComponent,
    PastordersComponent,
  ],
  imports: [
    NgxPayPalModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UserModule {}
