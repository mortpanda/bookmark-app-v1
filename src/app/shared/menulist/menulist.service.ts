import { Injectable } from '@angular/core';
import { OktaSDKAuthService } from '../okta/okta-auth.service';
import { OktaConfigService } from '../okta/okta-config.service';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  constructor(
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
  ) { }
  
  menuItems = [
    {
      label: 'メニュー',
      icon: "assets/img/menu_white.png",
      routerLink: ['/start']
    },
    {
      label: 'ホーム',
      icon: "assets/img/home_white.png",
      command: () => {
        this.GoHome();
      }
    },
    {
      label: 'ログアウト',
      icon: "assets/img/logout_white.png",
      command: () => {
        this.Logout();
      }
    },

  ];


  appNav = [
    {
      tooltipOptions: {
        tooltipLabel: "Save Bookmark",
        tooltipPosition: "top",
      },
      icon: 'pi pi-save',
      style: 'font-size: 0.7rem',
      routerLink: ['/bookmark']
    },
    {
      tooltipOptions: {
        tooltipLabel: "Bookmarks",
        tooltipPosition: "top",
      },
      icon: 'pi pi-bookmark-fill',
      style: 'font-size: 0.7rem',
      routerLink: ['/bookmark']
    },
  ]

  async Logout() {
    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }
}
