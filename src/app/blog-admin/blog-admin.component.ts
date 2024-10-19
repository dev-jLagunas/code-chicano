import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BlogService } from '../../services/blog.service';
import { QuillModule } from 'ngx-quill';
import {
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
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
  blogPosts: BlogPost[] = [];
  inEditMode: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private _bottomSheet: MatBottomSheet,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.blogForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      subtitle: [''],
      imageUrl: [''],
      date: [new Date()],
      description: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.blogService.blogPosts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => {
        this.blogPosts = posts;
      });
  }

  submitBlogForm() {
    if (this.blogForm.valid) {
      const formData: BlogPost = {
        id: this.blogForm.get('id')?.value,
        title: this.blogForm.value.title,
        subtitle: this.blogForm.value.subtitle,
        imageUrl: this.blogForm.value.imageUrl,
        date: this.blogForm.value.date,
        description: this.blogForm.value.description,
        content: this.blogForm.value.content,
      };

      formData.id
        ? this.resubmitEditedPost(formData)
        : this.addNewBlogPost(formData);

      this.resetForm();
    } else {
      console.log('Form is not valid');
    }
  }

  addNewBlogPost(formData: BlogPost) {
    this.blogService
      .addBlogPost(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newPost) => {
          alert(`Blog post '${newPost.title}' added successfully`);
        },
        error: (e) => {
          console.error('Error adding blog post:', e);
        },
      });
  }

  resubmitEditedPost(formData: BlogPost) {
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
  }

  resetForm() {
    this.blogForm.reset();
    this.blogForm.get('date')?.setValue(new Date());
    this.blogForm.get('id')?.setValue(null);
  }

  editPost(post: any) {
    this.inEditMode = true;
    this.blogForm.setValue({
      title: post.title,
      subtitle: post.subtitle,
      imageUrl: post.imageUrl,
      date: new Date(post.date),
      description: post.description,
      id: post.id,
      content: post.content || '',
    });
  }

  openBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(BlogEntriesComponent, {
      data: { blogPosts: this.blogPosts },
    });

    this.handleBottomSheetDismissal(bottomSheetRef);
  }

  // USE BOTTOM SHEET AS OUTPUT SO I CAN RECEIVE THE POST DATA TO BE EDITTED
  handleBottomSheetDismissal(bottomSheetRef: MatBottomSheetRef<any>) {
    bottomSheetRef
      .afterDismissed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((post) => {
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
