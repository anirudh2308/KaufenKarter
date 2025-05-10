import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "./user.component";
import { UserdashboardComponent } from "./userdashboard/userdashboard.component";
import { ProductsComponent } from "./products/products.component";
import { OffersComponent } from "./offers/offers.component";
import { SpecificproductComponent } from "./specificproduct/specificproduct.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ThankspageComponent } from "./thankspage/thankspage.component";
import { PastordersComponent } from "./pastorders/pastorders.component";
import { AuthGuard } from "src/app/shared/auth.guard";

const routes: Routes = [
  { path: "", component: UserComponent },
  {
    path: "userdash",
    component: UserdashboardComponent, //routing to component
    children: [
      { path: "", component: OffersComponent, canActivate: [AuthGuard] },
      {
        path: "products",
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      { path: "offers", component: OffersComponent, canActivate: [AuthGuard] },
      {
        path: "productinfo",
        component: SpecificproductComponent,
        canActivate: [AuthGuard],
      },
      { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
      {
        path: "checkout",
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "thanks",
        component: ThankspageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pastorders",
        component: PastordersComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
