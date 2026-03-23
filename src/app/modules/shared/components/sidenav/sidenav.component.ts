import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name:"Home", route:"home", icon:"home"},
    {name:"Categories", route:"category", icon:"category"},
    {name:"Tickets", route:"ticket", icon:"report"}

  ];

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');
  }
  ngOnInit(): void {
  }
}
