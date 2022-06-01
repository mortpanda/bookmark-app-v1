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
  myBookmarkDownloadUri;
  myAccessToken;
  apiCallResponse;
  myBookmarkList =[];
  myCategoryDownloadUri;
  myCategory;
  dataLoad: boolean;
  arrCategory = [];
  selectedBookmark=[];
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
        // await console.log(this.strThisUser)
        this.myUserID = await this.strThisUser.sub;
        // await console.log(this.myUserID);

        this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
        this.myBookmarkDownloadUri = await this.myAccessToken.claims.boomark_app_uri;
        this.myCategoryDownloadUri = await this.myAccessToken.claims.boomark_app_categories;
        // console.log(this.myBookmarkDownloadUri);
        await this.GetBookmarks(this.myUserID, this.myBookmarkDownloadUri);
        await this.GetCategories(this.myUserID, this.myCategoryDownloadUri);

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

        switch (this.myCategory.length) {
          case 0: {
            this.apiCallResponse = "Category download FAILED!";
            this.showError()

            break;
          }
          default: {
            this.apiCallResponse = "Category download Successful!";
            this.showSuccess();
            break;
          }
        }
        this.dataLoad = true;

        break;
    }
  }

  
  async CreateCatArray(data) {
    this.arrCategory = [...new Set(data.map(item => item.category))];
    console.log(this.arrCategory);

  }


  async GetCategories(uid, url) {
    let requestBody;
    requestBody = {
      uid: uid,
    }
    let requestURI;
    requestURI = url;
    this.myCategory = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
    console.log(this.myCategory)
  }



  async GetBookmarks(uid, url) {
    let requestBody;
    requestBody = {
      uid: uid,
    }
    let requestURI;
    requestURI = url;
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
