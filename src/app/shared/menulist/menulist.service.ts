import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  constructor() { }
  
  menuItems = [
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


  async Logout() {
    // this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    alert('test')
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }
}
