import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSlideToggleModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public themeService: ThemeService, private router: Router) {}

  routeToHome(): void {
    this.router.navigate(['home']);
  }

  routeToAbout(): void {
    this.router.navigate(['aboutme']);
  }

  routeToContact(): void {
    this.router.navigate(['contact']);
  }

  routeToBlogHome(): void {
    this.router.navigate(['bloghome']);
  }

  routeToLogin(): void {
    this.router.navigate(['login']);
  }
}
