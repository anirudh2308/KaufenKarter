import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

const routes: Routes = [{ path: '', component: FeaturesComponent }, { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
