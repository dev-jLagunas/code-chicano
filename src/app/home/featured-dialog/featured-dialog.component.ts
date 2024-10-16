import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import { BlogPost } from '../../../interface/blog-post';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-featured-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './featured-dialog.component.html',
  styleUrl: './featured-dialog.component.scss',
})
export class FeaturedDialogComponent implements OnInit {
  featuredPost$!: Observable<BlogPost | null>;
  constructor(
    private blogService: BlogService,
    public themeService: ThemeService,
    private router: Router,
    private dialogRef: MatDialogRef<FeaturedDialogComponent>
  ) {}

  ngOnInit(): void {
    this.featuredPost$ = this.blogService.getRandomBlogPost();
  }

  goToBlogDetail(postId: string) {
    this.router.navigate(['/blog', postId]).then(() => {
      this.dialogRef.close();
    });
  }
}
