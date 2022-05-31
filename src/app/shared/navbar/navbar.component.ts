import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MenulistService } from '../menulist/menulist.service';
import { PrimeIcons} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  
  smallScreen: boolean;
  mainMenu : MenuItem[];
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private MenulistService: MenulistService,
    private primengConfig: PrimeNGConfig,

  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.mainMenu = this.MenulistService.menuItems;
  }

  ngOnInit() {
  }

}
