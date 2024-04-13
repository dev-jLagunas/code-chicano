import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FeaturedDialogComponent } from './featured-dialog/featured-dialog.component';
import { LatestDialogComponent } from './latest-dialog/latest-dialog.component';
import { RandomDialogComponent } from './random-dialog/random-dialog.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FeaturedDialogComponent,
    LatestDialogComponent,
    RandomDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  navigateToBlogHome() {
    this.router.navigate(['/bloghome']);
  }

  openFeaturedDialog(): void {
    this.dialog.open(FeaturedDialogComponent);
  }

  openLatestDialog(): void {
    this.dialog.open(LatestDialogComponent);
  }

  openRandomDialog(): void {
    this.dialog.open(RandomDialogComponent);
  }
}
