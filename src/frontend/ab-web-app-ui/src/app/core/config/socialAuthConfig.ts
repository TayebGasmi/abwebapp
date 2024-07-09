import {GoogleInitOptions, GoogleLoginProvider, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {environment} from "../../../environments/environment";
const googleLoginOptions: GoogleInitOptions = {
  scopes: 'profile email',

}

export const socialAuthConfig:SocialAuthServiceConfig = {
    autoLogin: false,
    lang: 'en',
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          environment.GOOGLE_CLIENT_ID,
          googleLoginOptions
        )
      }
    ],
    onError: (err) => {
      console.error(err);
    }
  }

