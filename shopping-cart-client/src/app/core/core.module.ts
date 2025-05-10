import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";
import { CoreComponent } from "./core.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../shared/material/material.module";
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [CoreComponent, HomeComponent, LoginComponent, SignupComponent, Error404Component],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CoreModule {}
