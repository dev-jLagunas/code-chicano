import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: 'Code Chicano - Home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: 'Code Chicano - Home',
  },
  {
    path: 'aboutme',
    loadComponent: () =>
      import('./about-me/about-me.component').then((m) => m.AboutMeComponent),
    title: 'Code Chicano - About Me',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'Code Chicano - Contact',
  },
  {
    path: 'bloghome',
    loadComponent: () =>
      import('./blog-home/blog-home.component').then(
        (m) => m.BlogHomeComponent
      ),
    title: 'Code Chicano - Blog',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Code Chicano - Login',
  },
  {
    path: 'blog-admin',
    loadComponent: () =>
      import('./blog-admin/blog-admin.component').then(
        (m) => m.BlogAdminComponent
      ),
    title: 'Code Chicano - Admin',
    canActivate: [authGuard],
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./blog-post/blog-post.component').then(
        (m) => m.BlogPostComponent
      ),
    title: 'Code Chicano - Blog Post',
  },
];
