import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MenulistService } from '../menulist/menulist.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-smallscreen-nav',
  templateUrl: './smallscreen-nav.component.html',
  styleUrls: ['./smallscreen-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallscreenNavComponent implements OnInit {
  mainMenu : MenuItem[];
  constructor(
    private MenulistService: MenulistService,
  ) {
    this.mainMenu = this.MenulistService.menuItems;
   }

  ngOnInit(){
  }

}
