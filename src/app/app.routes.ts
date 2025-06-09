// app.routes.ts ili app-routing.module.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import {Search } from './search/search';
export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome').then(m => m.Welcome)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then(m => m.Cart)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(m => m.Profile)
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search').then(m => m.Search)
  },
  {
    path: 'navbar',
    loadComponent: () => import('./navbar/navbar').then(m => m.Navbar)
  },

  { path: '', component: Home },
  { path: 'pretraga', component: Search },


  { path: '', redirectTo: 'welcome', pathMatch: 'full' },  // Ovde osiguraj da welcome bude prva stranica
];
