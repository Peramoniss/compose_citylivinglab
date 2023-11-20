import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './programs/settings/dashboard-routing.module';
import { DataSourceRoutingModule } from './programs/data-source/data-source-routing.module';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'data-sources' },
  { path: 'data-sources', children: [...DataSourceRoutingModule.Routes] },
  { path: 'dashboard', children: [...DashboardRoutingModule.Routes] },

];

const guards: any[] = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule],
  providers: [...guards]
})
export class AppRoutingModule {
  static routes = appRoutes;
}
