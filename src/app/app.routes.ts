import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
  }
];
