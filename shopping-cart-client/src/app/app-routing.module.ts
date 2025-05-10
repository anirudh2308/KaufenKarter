import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent, //routing to component
  },
  {
    path: "core",
    loadChildren: () => import("./core/core.module").then((m) => m.CoreModule), // //routing to modules
  },
  {
    path: "shared",
    loadChildren: () =>
      import("./shared/shared.module").then((m) => m.SharedModule),
  },
  {
    path: "features",
    loadChildren: () =>
      import("./features/features.module").then((m) => m.FeaturesModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./features/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./features/user/user.module").then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
