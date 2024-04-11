import { Component, OnInit, Inject } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-entries',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.scss',
})
export class BlogEntriesComponent implements OnInit {
  blogPosts: any[] = [];

  constructor(
    private blogService: BlogService,
    private bottomSheetRef: MatBottomSheetRef<BlogEntriesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.blogService.blogPosts.subscribe((posts) => {
      this.blogPosts = posts;
    });
  }

  deletePost(postId: number) {
    this.blogService.deleteBlogPost(postId);
  }

  editPost(post: any) {
    this.bottomSheetRef.dismiss(post);
  }
}
