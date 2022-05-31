import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OktaConfigService {
  constructor() { }

  //Localhost https://kent-nagao-oie.oktapreview.com
  // strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  // strRedirectURL = 'https://localhost:4200/my-apps-launcher-v2/start/';
  // strClientID = '0oa43kgf64cEkbk9w0x7';
  // strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/aus43qx0voWry89Go0x7/';
  // strPostLogoutURL = 'https://localhost:4200/my-apps-launcher-v2/';
  // strScope = ['openid', 'email', 'profile', 'address','applauncher'];
  // strResponseType = ['token', 'id_token'];
  // strResponseMode = 'fragment';
  // strPrompt = 'login';
  // strPkce = true;
  // strLang = 'ja';
  // strBrand = '#00297A';
  // strLogo = "assets/img/okta-japan-small.png";
  // strMeEP = '/api/v1/users/me';

  // strGitHubRepo = "https://github.com/mortpanda/my-apps-launcher-v2";

  //Git Pages https://kent-nagao-oie.oktapreview.com
  strBaseURI = 'https://kent-nagao-oie.oktapreview.com/';
  strRedirectURL = 'https://mortpanda.github.io/my-apps-launcher-v2/start/';
  strClientID = '0oa43kgf64cEkbk9w0x7';
  strIssuer = 'https://kent-nagao-oie.oktapreview.com/oauth2/aus43qx0voWry89Go0x7/';
  strPostLogoutURL = 'https://mortpanda.github.io/my-apps-launcher-v2/';
  strScope = ['openid', 'email', 'profile', 'address'];
  strResponseType = ['token', 'id_token'];
  strResponseMode = 'fragment';
  strPrompt = 'login';
  strPkce = true;
  strLang = 'ja';
  strBrand = '#00297A';
  strLogo = "assets/img/okta-japan-small.png";
  strMeEP = '/api/v1/users/me';

  strGitHubRepo = "https://github.com/mortpanda/my-apps-launcher-v2";


}