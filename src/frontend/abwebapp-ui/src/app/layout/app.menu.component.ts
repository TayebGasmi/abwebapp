import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Smart School',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard']
                    }
                ]
            },
            {
            label: 'Settings',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Users',
                icon: 'pi pi-user',
                routerLink: ['/user']
              },
              {
                label: 'Roles',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/role']
              }
            ]
          },
        ];
    }
}
