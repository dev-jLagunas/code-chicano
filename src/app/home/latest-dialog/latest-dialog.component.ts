import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../../../services/blog.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-latest-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatCardModule, DatePipe],
  templateUrl: './latest-dialog.component.html',
  styleUrl: './latest-dialog.component.scss',
})
export class LatestDialogComponent implements OnInit {
  latestPost!: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private dialogRef: MatDialogRef<LatestDialogComponent>
  ) {}

  ngOnInit(): void {
    this.blogService.getNewestEntry().subscribe({
      next: (post) => {
        this.latestPost = post; // Update the latestPost only when the data is received
      },
      error: (error) => {
        console.error('Error fetching the latest post:', error);
        this.latestPost = null; // Handle potential errors, perhaps show a message or a default state
      },
    });
  }

  goToBlogDetail(postId: string) {
    this.router.navigate(['/blog', postId]).then(() => {
      this.dialogRef.close();
    });
  }
}
