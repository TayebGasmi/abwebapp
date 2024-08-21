import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {socialAuthConfig} from './core/config/socialAuthConfig';
import {errorInterceptor} from './core/interceptor/error.interceptor';
import {authInterceptor} from './core/interceptor/auth.interceptor';
import {MessageService} from 'primeng/api';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.translate.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, authInterceptor])
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthConfig
    },
    MessageService,
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
