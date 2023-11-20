import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataSourceDetailComponent } from './detail/data-source-detail.component';
import { DataSourceEditComponent } from './edit/data-source-edit.component';
import { DataSourceListComponent } from './list/data-source-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: DataSourceListComponent },
  { path: 'new',component: DataSourceEditComponent,},
  { path: 'edit/:code',component: DataSourceEditComponent,},
  { path: 'detail/:code', component: DataSourceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule {
  static Routes = routes;
}
