import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {socialAuthConfig} from "./core/config/socialAuthConfig";
import {errorInterceptor} from "./core/interceptor/error.interceptor";
import {authInterceptor} from "./core/interceptor/auth.interceptor";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideClientHydration()
    , provideAnimations(),
    provideHttpClient(withFetch()
      , withInterceptors([errorInterceptor, authInterceptor])
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthConfig
    },
    MessageService

  ]
};
