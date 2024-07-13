import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [AppBreadcrumbComponent, InputTextModule, ButtonDirective]
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    // pic   =localStorage ? localStorage.getItem("pic") : "";
    constructor(public layoutService: LayoutService) { }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

}
