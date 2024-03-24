import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'characters',
        loadComponent: () => import('./pages/characters/characters.page').then(m => m.CharactersPage),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
      },
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./pages/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.page').then( m => m.CharactersPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  }
];
