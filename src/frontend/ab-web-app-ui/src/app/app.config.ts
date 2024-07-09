import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch} from '@angular/common/http';
import {socialAuthConfig} from "./core/config/socialAuthConfig";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideClientHydration()
    , provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthConfig
    }
  ]
};
