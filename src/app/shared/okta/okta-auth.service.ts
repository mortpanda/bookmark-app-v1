import { Injectable } from '@angular/core';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { OktaConfigService } from './okta-config.service';


@Injectable({
  providedIn: 'root'
})
export class OktaSDKAuthService {
  constructor(private OktaConfigService: OktaConfigService  ){ }

    config:OktaAuthOptions = {
        clientId: this.OktaConfigService.strClientID,
        issuer: this.OktaConfigService.strIssuer,
        redirectUri: this.OktaConfigService.strRedirectURL,
        postLogoutRedirectUri:this.OktaConfigService.strPostLogoutURL,
        scopes: this.OktaConfigService.strScope,
    };

    OktaSDKAuthClient = new OktaAuth(this.config);    

    
  }
  