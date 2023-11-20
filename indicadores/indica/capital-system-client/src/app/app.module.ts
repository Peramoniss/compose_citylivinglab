import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { DashboardModule } from './programs/settings/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { DataSourceModule } from './programs/data-source/data-source.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    DashboardModule,
    DataSourceModule,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
