import { PoMenuItem } from "@po-ui/ng-components";

export interface MenuItem extends PoMenuItem {
  show?: Function | boolean;
  subItems?: MenuItem[] | undefined;
}