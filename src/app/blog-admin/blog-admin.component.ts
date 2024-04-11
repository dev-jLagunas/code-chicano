import { Component, OnInit } from '@angular/core';
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
export class BlogAdminComponent implements OnInit {
  blogForm!: FormGroup;
  blogPosts: any[] = [];
  inEditMode: boolean = false;

  constructor(
    private blogService: BlogService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl(''),
      imageUrl: new FormControl(
        '',
        Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)
      ),
      date: new FormControl(new Date()),
      description: new FormControl('', Validators.required),
      id: new FormControl(null),
      content: new FormControl('', Validators.required),
    });

    this.blogService.blogPosts.subscribe((posts) => {
      this.blogPosts = posts;
    });
  }

  submitBlogForm() {
    if (this.blogForm.valid) {
      const idControl = this.blogForm.get('id');
      if (idControl && idControl.value) {
        // Edit mode
        this.blogService.updateBlogPost(this.blogForm.value);
      } else {
        // Add new post
        this.blogService.addBlogPost(this.blogForm.value);
      }

      // Reset the form after submission
      this.blogForm.reset({
        title: '',
        subtitle: '',
        imageUrl: '',
        date: new Date(),
        description: '',
        id: null, // Reset the id
      });
      this.inEditMode = false; // Reset the edit mode flag
    } else {
      console.log('Form is not valid');
    }
  }

  deletePost(postId: number) {
    this.blogService.deleteBlogPost(postId);
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
      this.editPost(post);
    });
  }
}
