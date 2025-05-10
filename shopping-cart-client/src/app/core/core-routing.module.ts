import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CoreComponent } from "./core.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  { path: "", component: CoreComponent },
  {
    path: "",
    component: HomeComponent, //routing to component
  },
  {
    path: "home",
    component: HomeComponent, //routing to component
  },
  {
    path: "login",
    component: LoginComponent, //routing to component
  },
  {
    path: "signup",
    component: SignupComponent, //routing to component
  },
  {
    path: "404",
    component: Error404Component, //routing to component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
