import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../../../services/blog.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BlogPost } from '../../../interface/blog-post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-latest-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './latest-dialog.component.html',
  styleUrl: './latest-dialog.component.scss',
})
export class LatestDialogComponent implements OnInit {
  latestPost$!: Observable<BlogPost | null>;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private dialogRef: MatDialogRef<LatestDialogComponent>
  ) {}

  ngOnInit(): void {
    this.latestPost$ = this.blogService.getNewestEntry();
  }

  goToBlogDetail(postId: string) {
    this.router.navigate(['/blog', postId]).then(() => {
      this.dialogRef.close();
    });
  }
}
