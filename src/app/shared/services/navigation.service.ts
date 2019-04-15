import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.
  sub?: IChildItem[], // Dropdown items
  badges?: IBadge[]
}
interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }

  iconMenu: IMenuItem[] = [
    {
      name: 'Landlords',
      type: 'link',
      tooltip: 'Landlord',
      icon: 'people',
      state: 'landlords'
    },
    {
      name: 'Tenants',
      type: 'link',
      tooltip: 'Tenant',
      icon: 'people_outline',
      state: 'tenants'
    },
    {
      name: 'Rentals',
      type: 'dropDown',
      tooltip: 'Rentals',
      icon: 'account_balance',
      state: 'rentals',
      sub: [
        { name: 'Apartments', state: 'apartments' },
        { name: 'Rooms', state: 'rooms' },
      ]
    },
    {
      name: 'Offers',
      type: 'link',
      tooltip: 'Offer',
      icon: 'local_offer',
      state: 'offers'
    },
    {
      name: 'History',
      type: 'link',
      tooltip: 'History',
      icon: 'show_chart',
      state: 'history'
    },
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      // case 'separator-menu':
      //   this.menuItems.next(this.separatorMenu);
      //   break;
      // case 'icon-menu':
      //   this.menuItems.next(this.iconMenu);
      //   break;
      default:
        this.menuItems.next(this.iconMenu);
    }
  }
}
