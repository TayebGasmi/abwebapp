import {GoogleInitOptions, GoogleLoginProvider, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';

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
          '302542243565-le2eofetpr9b3ppcln0388nc5caoe49f.apps.googleusercontent.com',
          googleLoginOptions
        )
      }
    ],
    onError: (err) => {
      console.error(err);
    }
  }

