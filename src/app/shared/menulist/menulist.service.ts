import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  constructor() { }
  
  ItemsMenu = [
    {
      label: 'ホーム',
      icon: "pi pi-home",
      // style: 'font-size: 1.5rem',
      command: () => {
        this.GoHome();
      }
    },
    {
      label: 'ログアウト',
      icon: "pi pi-sign-out",
      // style: 'font-size: 1.5rem;',
      command: () => {
        this.Logout();
      }
    },
  ];


  async Logout() {
    // this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }
}
