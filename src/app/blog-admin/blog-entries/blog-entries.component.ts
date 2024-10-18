import { Component, Inject } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BlogPost } from '../../../interface/blog-post';

@Component({
  selector: 'app-blog-entries',
  standalone: true,
  imports: [DatePipe, MatButtonModule, AsyncPipe],
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.scss',
})
export class BlogEntriesComponent {
  blogPosts$: Observable<BlogPost[]> = this.blogService.blogPosts$;
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private bottomSheetRef: MatBottomSheetRef<BlogEntriesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

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
}
