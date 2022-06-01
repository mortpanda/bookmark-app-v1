import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-save-bookmark',
  templateUrl: './save-bookmark.component.html',
  styleUrls: ['./save-bookmark.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaveBookmarkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
