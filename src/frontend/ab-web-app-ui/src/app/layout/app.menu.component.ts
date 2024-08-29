import {Component, inject, OnInit} from '@angular/core';
import {AppMenuitemComponent} from './app.menuitem.component';
import {MenuModel} from "../core/models/menu-model";
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
        visible: this.authService.hasRoles(["STUDENT", "TEACHER"]),
        items: [
          {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            routerLink: "profile/details",
          }
        ]
      },
      {
        label: "booking",
        visible: this.authService.hasRoles(["STUDENT", "TEACHER"]),
        items: [
          {
            label: "calendar",
            icon: "pi pi-fw pi-calendar",
            routerLink: "calendar"
          },
          {
            label: "session",
            icon: "pi pi-fw pi-calendar",
            routerLink: "session-settings"
          }
        ]
      },{
      label: "Profile Dashboard",
      visible: this.authService.hasRoles(["ADMIN"]),
      items:[
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-cog",
          routerLink: "dashAdmin"
        },
      ]},
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
            routerLink: "settings/school-year"
          },
          {
            label: "Configuration",
            icon: "pi pi-fw pi-cog",
            routerLink: "settings/config"
          },
          {
            label: "Teachers",
            icon: "pi pi-fw pi-cog",
            routerLink: "settings/teacher"
          },

        ]
      }
    ];
  }
}
