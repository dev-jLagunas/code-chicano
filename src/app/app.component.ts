import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../services/theme.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { Router } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { LoginComponent } from './login/login.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    NavbarComponent,
    MatSlideToggleModule,
    NgClass,
    MatIconModule,
    HomeComponent,
    AboutMeComponent,
    MatSidenav,
    ContactComponent,
    BlogHomeComponent,
    LoginComponent,
    BlogAdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public themeService: ThemeService, private router: Router) {}

  ngAfterViewInit() {
    this.sidenav.openedStart.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  toggleTheme(): void {
    this.themeService.updateTheme();
  }

  routeToHome(contentSection: HTMLElement): void {
    this.router.navigate(['home']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }

  routeToAboutMe(contentSection: HTMLElement): void {
    this.router.navigate(['aboutme']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }

  routeToContact(contentSection: HTMLElement): void {
    this.router.navigate(['contact']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }

  routeToBlogHome(contentSection: HTMLElement): void {
    this.router.navigate(['bloghome']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }

  routeToLogin(contentSection: HTMLElement): void {
    this.router.navigate(['login']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }
}
