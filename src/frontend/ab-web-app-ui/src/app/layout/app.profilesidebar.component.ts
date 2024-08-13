import {Component, inject, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {BadgeModule} from 'primeng/badge';
import {SidebarModule} from 'primeng/sidebar';
import {AuthService} from '../core/service/auth.service';
import {UserService} from '../core/service/user.service';
import {User} from "../core/models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
  standalone: true,
  imports: [SidebarModule, BadgeModule]
})
export class AppProfileSidebarComponent implements OnInit {
  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(user => {
      this.currentUser = user;
    });
  }
  router =inject(Router)

  constructor(public layoutService: LayoutService, private authService: AuthService, private userService: UserService) {

  }

  currentUser: User|null = null;
  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  signOut() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
