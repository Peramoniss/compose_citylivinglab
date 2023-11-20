import { Component } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public pageActions: Array<PoPageAction> = [
  ];
  public capitalfileDirectory: String = '';
  public indicatorfileDirectory: String = '';

  onClick() {
    alert('Po Button!');
  }

}
