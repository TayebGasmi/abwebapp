import {Component, OnDestroy, Renderer2, ViewChild, Inject, PLATFORM_ID, inject} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MenuService } from './app.menu.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { LayoutService } from './service/app.layout.service';
import { AppConfigComponent } from './config/app.config.component';
import { AppProfileSidebarComponent } from './app.profilesidebar.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { NgClass } from '@angular/common';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  standalone: true,
  imports: [NgClass, AppSidebarComponent, AppTopbarComponent, AppBreadcrumbComponent, RouterOutlet, AppProfileSidebarComponent, AppConfigComponent]
})
export class AppLayoutComponent implements OnDestroy {
  private oAuthService = inject(OAuthService);
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  menuScrollListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

  constructor(
    private menuService: MenuService,
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener && isPlatformBrowser(this.platformId)) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
            || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
          if (isOutsideClicked) {
            this.hideMenu();
          }
        });
      }

      if ((this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isSlimPlus()) && !this.menuScrollListener && isPlatformBrowser(this.platformId)) {
        this.menuScrollListener = this.renderer.listen(this.appSidebar.menuContainer.nativeElement, 'scroll', event => {
          if (this.layoutService.isDesktop()) {
            this.hideMenu();
          }
        });
      }

      if (this.layoutService.state.staticMenuMobileActive && isPlatformBrowser(this.platformId)) {
        this.blockBodyScroll();
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.hideMenu();
    });
   console.log(this.oAuthService.getIdToken());
  }

  blockBodyScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (document.body.classList) {
        document.body.classList.add('blocked-scroll');
      }
      else {
        document.body.className += ' blocked-scroll';
      }
    }
  }

  unblockBodyScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (document.body.classList) {
        document.body.classList.remove('blocked-scroll');
      }
      else {
        document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
          'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    this.menuService.reset();

    if(this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }

    if (this.menuScrollListener) {
      this.menuScrollListener();
      this.menuScrollListener = null;
    }

    this.unblockBodyScroll();
  }

  get containerClass() {
    return {
      'layout-light': this.layoutService.config.colorScheme === 'light',
      'layout-dim': this.layoutService.config.colorScheme === 'dim',
      'layout-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-colorscheme-menu': this.layoutService.config.menuTheme === 'colorScheme',
      'layout-primarycolor-menu': this.layoutService.config.menuTheme === 'primaryColor',
      'layout-transparent-menu': this.layoutService.config.menuTheme === 'transparent',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-slim': this.layoutService.config.menuMode === 'slim',
      'layout-slim-plus': this.layoutService.config.menuMode === 'slim-plus',
      'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
      'layout-reveal': this.layoutService.config.menuMode === 'reveal',
      'layout-drawer': this.layoutService.config.menuMode === 'drawer',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
      'layout-sidebar-active': this.layoutService.state.sidebarActive,
      'layout-sidebar-anchored': this.layoutService.state.anchored
    }
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }

}
