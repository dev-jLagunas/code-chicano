import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BlogService } from '../../services/blog.service';
import { QuillModule } from 'ngx-quill';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { BlogEntriesComponent } from './blog-entries/blog-entries.component';
import { BlogPost } from '../../interface/blog-post';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-blog-admin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    QuillModule,
    MatBottomSheetModule,
    BlogEntriesComponent,
  ],
  templateUrl: './blog-admin.component.html',
  styleUrl: './blog-admin.component.scss',
})
export class BlogAdminComponent implements OnInit, OnDestroy {
  blogForm!: FormGroup;
  blogPosts: any[] = [];
  inEditMode: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl(''),
      imageUrl: new FormControl(''),
      date: new FormControl(new Date()),
      description: new FormControl('', Validators.required),
      id: new FormControl(null),
      content: new FormControl('', Validators.required),
    });

    this.blogService.blogPosts$.subscribe((posts) => {
      this.blogPosts = posts;
    });
  }

  submitBlogForm() {
    if (this.blogForm.valid) {
      // Include ID in the formData if it exists
      const formData: BlogPost = {
        id: this.blogForm.get('id')?.value, // Ensure ID is included if it's an update
        title: this.blogForm.value.title,
        subtitle: this.blogForm.value.subtitle,
        imageUrl: this.blogForm.value.imageUrl,
        date: this.blogForm.value.date,
        description: this.blogForm.value.description,
        content: this.blogForm.value.content,
      };

      if (formData.id) {
        // If ID exists, update the existing post
        this.blogService
          .updateBlogPost(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              alert(`Blog post '${formData.title}' updated successfully`);
            },
            error: (e) => {
              console.error('Error updating blog post:', e);
            },
          });
      } else {
        this.blogService
          .addBlogPost(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (updatedPost) => {
              alert(`Blog post '${updatedPost.title}' added successfully`);
            },
            error: (e) => {
              console.error('Error adding blog post:', e);
            },
          });
      }

      // Reset the form after submission
      this.blogForm.reset();
      this.blogForm.get('date')?.setValue(new Date()); // Set date to current date after reset
      this.blogForm.get('id')?.setValue(null); // Ensure ID is reset
    } else {
      console.log('Form is not valid');
    }
  }

  editPost(post: any) {
    this.blogForm.setValue({
      title: post.title,
      subtitle: post.subtitle,
      imageUrl: post.imageUrl,
      date: new Date(post.date),
      description: post.description,
      id: post.id,
      content: post.content || '',
    });
    this.inEditMode = true;
  }

  openBottomSheet() {
    let bottomSheetRef = this._bottomSheet.open(BlogEntriesComponent, {
      data: { blogPosts: this.blogPosts },
    });

    bottomSheetRef.afterDismissed().subscribe((post) => {
      if (post) {
        this.editPost(post);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
