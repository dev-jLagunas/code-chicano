import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-random-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './random-dialog.component.html',
  styleUrl: './random-dialog.component.scss',
})
export class RandomDialogComponent {}
