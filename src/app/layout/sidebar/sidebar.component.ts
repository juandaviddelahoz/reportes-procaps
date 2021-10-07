import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  imagePath : string;

  ngOnInit(): void {

    this.imagePath = "../../../assets/bower_components/dist/img/LogoViajar1.png";
  }

}
