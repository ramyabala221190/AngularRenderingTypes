import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path:'about',
    renderMode: RenderMode.Prerender
  },
  {
    path:'cart',
    renderMode:RenderMode.Client
  },
  {
    path:'login',
    renderMode:RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
  
];
 