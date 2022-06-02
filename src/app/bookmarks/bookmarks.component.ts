import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../shared/okta/okta-config.service";
import { OktaApiService } from "../shared/okta/okta-api.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookmarksComponent implements OnInit {
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  smallScreen: boolean;
  strFullName;
  myUserID;
  myBookmarkUri;
  myAccessToken;
  apiCallResponse;
  myBookmarkList = [];
  myCategoryDownloadUri;
  myCategory;
  dataLoad: boolean;
  arrCategory = [];
  selectedBookmark = [];
  bookmarkTableCols: string[] = ['description', 'category', 'siteURL'];

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public OktaConfigService: OktaConfigService,
    private breakpointObserver: BreakpointObserver,
    private OktaApiService: OktaApiService,
    private messageService: MessageService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  async ngOnInit() {
    this.dataLoad = false;
    this.strUserSession = await this.authService.isAuthenticated();
    console.log(this.strUserSession)
    switch (this.strUserSession == true) {
      case false:
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        this.strThisUser = await this.authService.token.getUserInfo()
          .then(function (user) {
            return user
          })
          .catch((err) => {
            console.log(err);
            window.location.replace(this.OktaConfigService.strPostLogoutURL);
          })
        this.strFullName = await this.strThisUser.name;
        this.myUserID = await this.strThisUser.sub;
        this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
        this.myBookmarkUri = await this.myAccessToken.claims.boomark_app_uri;
        await this.GetBookmarks(this.myUserID, this.myBookmarkUri,"download");
        switch (this.myBookmarkList.length) {
          case 0: {
            this.apiCallResponse = "Bookmark download FAILED!";
            this.showError()

            break;
          }
          default: {
            this.apiCallResponse = "Bookmark download Successful!";
            this.showSuccess();
            break;
          }
        }
        this.dataLoad = true;
        break;
    }
  }


  async GetBookmarks(uid, url, action?) {
    let requestBody;
    requestBody = {
      uid: uid,
      action:action,
    }
    let requestURI;
    requestURI = url;
    let requestAction;
    requestAction = action;

    this.myBookmarkList = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    console.log(this.myBookmarkList)
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.apiCallResponse });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.apiCallResponse });
  }
  onReject() {
    this.messageService.clear('c');
  }

}
