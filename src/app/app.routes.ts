import { Routes } from '@angular/router';
import { About } from './about/about';
import { Login } from './login/login';
import { authenticatedGuard } from './authenticated-guard';
import { Products } from './products/products';
import { CartDetail } from './cart-detail/cart-detail';

export const routes: Routes = [
    {
        path:'about',
        component:About
    },
    {
        path:'catalogue',
        component:Products
    },
    {
        path:'cart',
        component:CartDetail,
        canActivate:[authenticatedGuard]
    },
    {
        path:'login',
        component:Login,
    },
    {
        path:"**",
        pathMatch:"full",
        redirectTo:'catalogue'

    }

];
