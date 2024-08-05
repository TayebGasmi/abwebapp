import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "./service/app.layout.service";
import {ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {UserService} from "../core/service/user.service";
import {User} from "../core/models/User";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [AppBreadcrumbComponent, InputTextModule, ButtonDirective, NgOptimizedImage],
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  ngOnInit(): void {
    this.userServices.getUserDetails().subscribe(user => {
      this.currentUser = user;
    });
  }

  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public layoutService: LayoutService,private userServices:UserService) {
  }
  currentUser!:User
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
