import { AfterContentInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuComponent } from '@po-ui/ng-components';
import { AppRoutingModule } from './app-routing.module';
import { CentralPtuStorage } from './shared/enums/storage.enum';
import { MenuItem } from './shared/models/menu-item';
import { MenuService } from './shared/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit{

  @ViewChild('menuComponent', { static: false }) menuComponent!: PoMenuComponent;

  loading = { active: false, message: '' };

  constructor(
    public menuService: MenuService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngAfterContentInit() {
    this.menuService.onNavigate.subscribe(() => this.collapseMenu());
    this.showLoading('Carregando');
    this.menuService.refresh()
    .then(items => this.navigateToLastLocation(items))
    .finally(() => this.hideLoading());

  }

  private navigateToLastLocation(visibleMenus:MenuItem[]) {
    if (window.localStorage) {
      let location = window.localStorage.getItem(CentralPtuStorage.LastVisitedLocation);
      if (location) {
        if (location.startsWith('/')) {
          location = location.substring(1);
        }
        const storedRoute = AppRoutingModule.routes.filter(item => item.path!.length > 0).find(item => location!.startsWith(item.path!));
        if (storedRoute) {
          this.router.navigate([storedRoute.path]);
          return;
        }
      }
    }
    // vai para a primeira tela disponivel
    if (visibleMenus.length > 0) {
      let menu = visibleMenus[0];
      if (!menu.action && menu.subItems!.length > 0) {
        menu = menu.subItems![0];
      }
      if (menu?.action) {
        menu.action();
      }
    }
  }

  private showLoading(message:string) {
    this.loading.message = message;
    this.loading.active = true;
    this.changeDetectorRef.detectChanges();
  }

  private hideLoading() {
    this.loading.message = '';
    this.loading.active = false;
    this.changeDetectorRef.detectChanges();
  }

  private collapseMenu() {
    this.menuComponent.collapse();
  }
}
