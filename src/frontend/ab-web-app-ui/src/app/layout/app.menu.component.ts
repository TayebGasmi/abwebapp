import {Component, inject, OnInit} from '@angular/core';
import {AppMenuitemComponent} from './app.menuitem.component';
import {MenuModel} from "../core/models/MenuModel";
import {AuthService} from "../core/service/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {
  authService = inject(AuthService);
  model: MenuModel[] = [];

  ngOnInit() {
    this.model = [
      {
        label: "profile",
        visible: this.authService.hasRoles(["STUDENT","TEACHER"]),
        items: [
          {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            routerLink: "profile",
          }
        ]
      },
      {
        label: "booking",
        visible: this.authService.hasRoles(["STUDENT","TEACHER"]),
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
        visible: this.authService.hasRoles(["STUDENT","TEACHER"]),

        items: [
          {
            label: "Sessions",
            icon: "pi pi-fw pi-list",
            routerLink: "sessionlist"
          }
        ]
      },
      {
        label: "settings",
        visible: this.authService.hasRoles(["ADMIN"]),
        items: [
          {
            label: "Subject",
            icon: "pi pi-fw pi-book",
            routerLink: "settings/subject"
          },
          {
            label: "School types",
            icon: "pi pi-fw pi-book",
            routerLink: "settings/school"
          },
          {
            label: "School Year",
            icon: "pi pi-fw pi-calendar",
            routerLink: "settings/schoolyear"
          },
          {
            label: "Configuration",
            icon: "pi pi-fw pi-cog",
            routerLink: "settings/config"
          },
        ]
      }
    ];
  }
}
