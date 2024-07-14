import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {BadgeModule} from 'primeng/badge';
import {SidebarModule} from 'primeng/sidebar';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
  standalone: true,
  imports: [SidebarModule, BadgeModule]
})
export class AppProfileSidebarComponent {

  constructor(public layoutService: LayoutService) {
  }

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }
}
