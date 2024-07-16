import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {socialAuthConfig} from "./core/config/socialAuthConfig";
import {provideToastr} from "ngx-toastr";
import {errorInterceptor} from "./core/interceptor/error.interceptor";
import {authInterceptor} from "./core/interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideClientHydration()
    , provideAnimations(),
    provideHttpClient(withFetch()
    ,withInterceptors([errorInterceptor,authInterceptor])
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthConfig
    },
    provideToastr(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true
      }
    )

  ]
};
