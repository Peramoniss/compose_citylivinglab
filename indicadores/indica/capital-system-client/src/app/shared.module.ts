import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuService } from './shared/services/menu.service';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';

const modules = [
  BrowserModule,
  CommonModule,
  FormsModule,
  BrowserAnimationsModule,
  PoModule,
  PoCodeEditorModule,
];
const services = [
    MenuService,
];
const directives: any[] = [];
const pipes: any[] = [];
@NgModule({
  declarations: [
    ...directives,
    ...pipes,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...directives,
    ...pipes,
  ],
  providers: [
    ...services,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...services,
      ]
    };
  }
}
