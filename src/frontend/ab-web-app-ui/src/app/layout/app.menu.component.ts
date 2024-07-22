import {Component, OnInit} from '@angular/core';
import {AppMenuitemComponent} from './app.menuitem.component';
import {MenuModel} from "../core/models/MenuModel";


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

  model: MenuModel[] = [];

  ngOnInit() {
    this.model = [

      {
        label: "profile",
        items: [
          {
            label: "Profile",
            icon: "pi pi-fw pi-calendar",
            routerLink: "profile"
          }
        ]
      },
      {
        label: "booking",
        items: [
          {
            label: "calendar",
            icon: "pi pi-fw pi-calendar",
            routerLink: "calendar"
          }
        ]
      },
      {
        label: "session",
        items: [
          {
            label: "Session",
            icon: "pi pi-fw pi-calendar",
            routerLink: "session"
          }, {
            label: "Display Sessions",
            icon: "pi pi-fw pi-calendar",
            routerLink: "sessionlist"
          }
        ]
      },
      {
        label: "settings",
        items: [
          {
            label: "Subject",
            icon: "",
            routerLink: "settings/subject"
          }
        ]
      }
    ]
  }
}
