import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration  } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // Import a theme preset (Aura, Lara, or Nora)
import { appInterceptor } from './interceptor';
//import { InterceptorService } from './interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    //provideHttpClient(withFetch(),withInterceptorsFromDi()),
    provideHttpClient(
      withFetch(),
      withInterceptors([appInterceptor])
    ),
    provideRouter(routes), provideClientHydration(),
    providePrimeNG({
        theme: {
            preset: Aura, // This automatically hooks up and injects component styles
            options: {
                darkModeSelector: '.my-app-dark' // Optional: Custom dark mode class hook
            }
        }
    }),
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:InterceptorService,
    //   multi:true
    // }
  ]
};
