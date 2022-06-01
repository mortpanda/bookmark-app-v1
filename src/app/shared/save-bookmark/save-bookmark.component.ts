import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-bookmark',
  templateUrl: './save-bookmark.component.html',
  styleUrls: ['./save-bookmark.component.scss']
})
export class SaveBookmarkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  display: boolean = false;

  showDialog() {
      this.display = true;
  }

}
