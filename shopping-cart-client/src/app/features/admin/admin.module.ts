import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ManageproductsComponent } from "./manageproducts/manageproducts.component";
import { NewproductComponent } from "./newproduct/newproduct.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../../shared/material/material.module";
import { UpdateproductComponent } from "./updateproduct/updateproduct.component";
import { ViewstatsComponent } from "./viewstats/viewstats.component";
import { Ng9OdometerModule } from "ng9-odometer";
@NgModule({
  declarations: [
    AdminComponent,
    AdmindashboardComponent,
    ManageproductsComponent,
    NewproductComponent,
    UpdateproductComponent,
    ViewstatsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule,
    Ng9OdometerModule,
  ],
})
export class AdminModule {}
