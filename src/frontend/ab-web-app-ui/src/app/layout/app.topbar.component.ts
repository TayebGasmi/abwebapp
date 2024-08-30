import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "./service/app.layout.service";
import {ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {UserService} from "../core/service/user.service";
import {User} from "../core/models/user";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [AppBreadcrumbComponent, InputTextModule, ButtonDirective, NgOptimizedImage],
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  @ViewChild('menubutton') menuButton!: ElementRef;
  currentUser: User | null = null;

  constructor(public layoutService: LayoutService, private userServices: UserService) {
  }

  ngOnInit(): void {
    this.userServices.getUserDetails().subscribe(user => {
      this.currentUser = user;
    });
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }


}
