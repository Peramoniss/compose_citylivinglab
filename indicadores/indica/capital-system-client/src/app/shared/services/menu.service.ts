import { EventEmitter, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CentralPtuStorage } from '../enums/storage.enum';
import { MenuItem } from '../models/menu-item';

@Injectable()
export class MenuService {

  items!: MenuItem[];
  onNavigate: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router
  ) {
    this.subscribeNavigation();
  }

  refresh(): Promise<MenuItem[]> {
    let pAwait: Promise<any>;
    pAwait = Promise.resolve();
    return pAwait.then(() => {
      this.items = this.buildVisibleMenus(this.menus);
      return this.items;
    });
  }


  private resolveItem(item: MenuItem): boolean {
    if(item.show === false){
      return false;
    } 
    if(item.show === true){
      return true;
    } 
    if(item.show === null || item.show === undefined){
      return true;
    } 
    return item.show();
  }

  private buildVisibleMenus(items:MenuItem[]): MenuItem[] {
    const result:MenuItem[] = [];

    items.forEach(menuItem => {
      const item:MenuItem = Object.assign({},menuItem);

      if (this.resolveItem(item)) {
        //item.subItems = null;

        if (menuItem.subItems && Array.isArray(menuItem.subItems)) {
          const subItems = this.buildVisibleMenus(menuItem.subItems);
          if (subItems.length > 0) {
            item.subItems = subItems;
            result.push(item);
          }
        }
        else {
          result.push(item);
        }
      }
    });
    return result;
  }

  private readonly menus: MenuItem[] = [
    { label: 'Gerenciar fontes de dados', icon: 'po-icon po-icon-document-double', shortLabel: 'Gerenciar', action: () => { this.navigateFromMenu(['data-sources']) }, show: true },
    { label: 'Configuração', icon: 'po-icon po-icon-settings', shortLabel: 'Configurar', action: () => { this.navigateFromMenu(['dashboard']) }, show: false },
  ];

  private navigateFromMenu(path:string[]) {
    this.router.navigate([...path]);
  }

  private subscribeNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.onNavigationEnd(event); }
    });
  }
  
  private onNavigationEnd(e: NavigationEnd) {
    if (window.localStorage) {
      window.localStorage.setItem(CentralPtuStorage.LastVisitedLocation, e.url);
    }
    this.onNavigate.emit(e.url);
  }

}
