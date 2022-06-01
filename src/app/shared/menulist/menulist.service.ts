import { Injectable } from '@angular/core';
import { OktaSDKAuthService } from '../okta/okta-auth.service';
import { OktaConfigService } from '../okta/okta-config.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {SaveBookmarkComponent} from '../save-bookmark/save-bookmark.component';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  constructor(
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
    private _matdialog: MatDialog,
    private SaveBookmarkComponent:SaveBookmarkComponent,
    
  ) { }
  
  saveBookmark(){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "savebookmark-modal-component";
    DialogConfig.height = "400px";
    DialogConfig.width = "600px";
    const modalDialog = this._matdialog.open(SaveBookmarkComponent, DialogConfig);
  }


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
      command: () => {
        this.saveBookmark();
      }
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
