import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaApiService } from "../../shared/okta/okta-api.service";
import { OktaGetTokenService } from '../../shared/okta/okta-get-token.service';
import { OktaSDKAuthService } from '../../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../../shared/okta/okta-config.service";
import { MessageService } from 'primeng/api';
interface arrCat {
  category: string,
}

@Component({
  selector: 'app-save-bookmark',
  templateUrl: './save-bookmark.component.html',
  styleUrls: ['./save-bookmark.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaveBookmarkComponent implements OnInit {
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strThisUser;
  smallScreen: boolean;
  strBookmarkUri;
  selectedMessage: any;
  myAccessToken;

  myCategoryDownloadUri;
  myUserID;
  catDownload: boolean;
  selectedCat: string;
  arrCat: arrCat[];
  toastMsg;
  myBookmarkUri;
  catErrorCheck: boolean;
  urlErrorCheck: boolean;
  descErrorCheck: boolean;
  createResponse;
  bookmarkDesc;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private OktaApiService: OktaApiService,
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public OktaConfigService: OktaConfigService,
    private messageService: MessageService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.catDownload = false;
  }

  async ngOnInit() {

    this.strThisUser = await this.authService.token.getUserInfo()
      .then(function (user) {
        return user
      })
      .catch((err) => {
        console.log(err);
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      })

    // await console.log(this.strThisUser)
    this.myUserID = await this.strThisUser.sub;

    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
    this.myCategoryDownloadUri = await this.myAccessToken.claims.boomark_app_categories;
    await this.GetCategories(this.myUserID, this.myCategoryDownloadUri);
    console.log(this.arrCat);

    this.catDownload = true;
  }

  async GetCategories(uid, url) {
    let requestBody;
    requestBody = {
      uid: uid,
    }
    let requestURI;
    requestURI = url;
    this.arrCat = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
  }

  async uploadBookmark() {
    this.catErrorCheck = false;
    this.urlErrorCheck = false;
    this.descErrorCheck = false;
    this.strThisUser = await this.authService.token.getUserInfo()
      .then(function (user) {
        return user
      })
      .catch((err) => {
        console.log(err);
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
      })

    this.myUserID = await this.strThisUser.sub;
    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myBookmarkUri = await this.myAccessToken.claims.boomark_app_uri;
    this.catErrorCheck = false;
    console.log(this.selectedCat);
    switch (this.selectedCat) {
      case undefined: {
        this.toastMsg = "Category Not Selected";
        this.catErrorCheck = false;
        this.showError()
        break;
      }
      case null: {
        this.toastMsg = "Category Not Selected";
        this.catErrorCheck = false;
        this.showError()
        break;
      }
      default: {
        this.catErrorCheck = true;
        break;
      }
    }
    switch (this.strBookmarkUri) {
      case undefined: {
        this.toastMsg = "URL Not entered";
        this.urlErrorCheck = false;
        this.showError()
        break;
      }
      case null: {
        this.toastMsg = "Category Not Selected";
        this.urlErrorCheck = false;
        this.showError()
        break;
      }
      default: {
        this.urlErrorCheck = true;
        break;
      }
    }
    switch (this.bookmarkDesc) {
      case undefined: {
        this.toastMsg = "Description Not entered";
        this.descErrorCheck = false;
        this.showError()
        break;
      }
      case null: {
        this.toastMsg = "Description Not entered";
        this.descErrorCheck = false;
        this.showError()
        break;
      }
      default: {
        this.descErrorCheck = true;
        break;
      }
    }
    this.createResponse = await this.CreateBookmark(this.myUserID, this.myBookmarkUri, "create", this.selectedCat, this.strBookmarkUri, this.bookmarkDesc);
  }

  async CreateBookmark(uid, url, action, cat, struri, desc) {
    if (this.urlErrorCheck == true && this.catErrorCheck == true && this.descErrorCheck == true) {

      // let requestAction;
      // requestAction = action;

      let requestURI;
      requestURI = url;

      let requestBody;
      requestBody = {
        uid: uid,
        action: action,
        category: cat,
        uri: struri,
        description: desc,
      }
      this.createResponse = await this.OktaApiService.InvokeFlow(requestURI, requestBody);
      console.log(this.createResponse.status)
      switch (this.createResponse.status) {
        case 200: {
          this.toastMsg = 'Created Bookmark!';
          this.showSuccess();
          break;
        }
        default: {
          this.toastMsg = 'Problem creating the bookmark!';
          this.showError();
          break;
        }
      }

    } else {
      // error
      this.toastMsg = "There is a problem with the form";

      this.showError()
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.toastMsg });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.toastMsg });
  }
  onReject() {
    this.messageService.clear('c');
  }


}
