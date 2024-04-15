import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { LoginComponent } from './login/login.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'bloghome', component: BlogHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog-admin', component: BlogAdminComponent },
  { path: 'blog/:id', component: BlogPostComponent },
];
