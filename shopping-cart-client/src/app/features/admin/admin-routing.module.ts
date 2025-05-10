import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { ManageproductsComponent } from "./manageproducts/manageproducts.component";
import { NewproductComponent } from "./newproduct/newproduct.component";
import { UpdateproductComponent } from "./updateproduct/updateproduct.component";
import { ViewstatsComponent } from "./viewstats/viewstats.component";
import { AuthGuard } from "src/app/shared/auth.guard";

const routes: Routes = [
  { path: "", component: AdminComponent },
  {
    path: "admindash",
    component: AdmindashboardComponent, //routing to component
    children: [
      {
        path: "",
        component: ManageproductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "manageproducts",
        component: ManageproductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "newproduct",
        component: NewproductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "updateproduct",
        component: UpdateproductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "viewstats",
        component: ViewstatsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
