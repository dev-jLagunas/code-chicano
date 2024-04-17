import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-featured-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatCardModule, DatePipe],
  templateUrl: './featured-dialog.component.html',
  styleUrl: './featured-dialog.component.scss',
})
export class FeaturedDialogComponent implements OnInit {
  featuredPost!: any;
  constructor(
    private blogService: BlogService,
    public themeService: ThemeService,
    private router: Router,
    private dialogRef: MatDialogRef<FeaturedDialogComponent>
  ) {}

  ngOnInit(): void {
    this.blogService.getRandomBlogPost().subscribe({
      next: (post) => {
        this.featuredPost = post; // Update the latestPost only when the data is received
      },
      error: (error) => {
        console.error('Error fetching the latest post:', error);
        this.featuredPost = null; // Handle potential errors, perhaps show a message or a default state
      },
    });
  }

  goToBlogDetail(postId: string) {
    this.router.navigate(['/blog', postId]).then(() => {
      this.dialogRef.close();
    });
  }
}
