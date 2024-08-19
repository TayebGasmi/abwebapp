import {afterNextRender, Component, inject, Injector, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {BadgeModule} from 'primeng/badge';
import {SidebarModule} from 'primeng/sidebar';
import {AuthService} from '../core/service/auth.service';
import {UserService} from '../core/service/user.service';
import {User} from "../core/models/user";
import {Router} from "@angular/router";
import {BrowserStorageService} from "../core/service/browser-storage.service";

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
  standalone: true,
  imports: [SidebarModule, BadgeModule]
})
export class AppProfileSidebarComponent implements OnInit {
  currentUser: User | null = null;
  injector = inject(Injector);


  constructor(public router:Router,public browserStorage:BrowserStorageService,public layoutService: LayoutService, private authService: AuthService, private userService: UserService) {

  }

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(user => {
      this.currentUser = user;
    });
  }

  signOut() {
    window.location.reload();
    if (typeof window !== "undefined") {
      this.browserStorage.clear()
      this.router.navigate(['/auth/login']);
    }
  }

  goToProfile() {
    this.router.navigate(['profile/details']);
  }
}
