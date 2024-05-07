import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blog-entries',
  standalone: true,
  imports: [DatePipe, MatButtonModule],
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.scss',
})
export class BlogEntriesComponent implements OnInit, OnDestroy {
  blogPosts: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private bottomSheetRef: MatBottomSheetRef<BlogEntriesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.blogService.blogPosts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => {
        this.blogPosts = posts;
      });
  }

  deletePost(postId: string) {
    this.blogService
      .deleteBlogPost(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          alert('Blog post deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting blog post:', error);
        },
      });
  }

  editPost(post: any) {
    this.bottomSheetRef.dismiss(post);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
