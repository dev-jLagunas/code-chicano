import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogPost } from '../interface/blog-post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsSource = new BehaviorSubject<BlogPost[]>([]);
  blogPosts = this.blogPostsSource.asObservable();
  private firebaseUrl =
    'https://code-chicano-default-rtdb.firebaseio.com/blogPosts';

  constructor(private http: HttpClient) {
    this.loadFromFirebase();
  }

  addBlogPost(newPost: BlogPost) {
    // POST request to the Firebase; response will include the new Firebase-generated ID
    this.http.post<any>(`${this.firebaseUrl}.json`, newPost).subscribe({
      next: (response) => {
        console.log('Firebase response:', response); // Log the response from Firebase
        newPost.id = response.name; // Use the Firebase-generated ID
        const currentPosts = this.blogPostsSource.getValue();
        this.blogPostsSource.next([...currentPosts, newPost]); // Update the local posts state
      },
      error: (e) => console.error('Error adding blog post to Firebase:', e),
    });
  }

  loadFromFirebase() {
    // Correctly appending `.json` to fetch all blog posts as JSON
    this.http
      .get<{ [key: string]: BlogPost }>(`${this.firebaseUrl}.json`)
      .subscribe({
        next: (response) => {
          const posts = Object.entries(response || {}).map(([key, value]) => ({
            ...value,
            id: key, // Using the key from Firebase as the post ID
          }));
          this.blogPostsSource.next(posts); // Update the BehaviorSubject with the fetched posts
        },
        error: (e) => console.error('Error loading posts from Firebase:', e),
      });
  }

  deleteBlogPost(postId: string) {
    const url = `${this.firebaseUrl}/${postId}.json`; // Corrected URL format
    console.log('URL for DELETE:', url); // Logging the correct URL
    this.http.delete(url).subscribe({
      next: () => {
        const updatedPosts = this.blogPostsSource
          .getValue()
          .filter((post) => post.id !== postId);
        this.blogPostsSource.next(updatedPosts);
      },
      error: (e) => console.error('Error deleting blog post from Firebase:', e),
    });
  }

  updateBlogPost(updatedPost: BlogPost) {
    // Ensure the URL is correctly pointing to the specific post to update
    const url = `${this.firebaseUrl}/${updatedPost.id}.json`;

    // Send a PUT request to Firebase to update the specific post
    this.http.put<BlogPost>(url, updatedPost).subscribe({
      next: (response) => {
        // Handle the response if necessary, typically the updated post data is returned
        console.log('Update response:', response);
        // Update the local state to reflect the changes
        const currentPosts = this.blogPostsSource.getValue();
        const postIndex = currentPosts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (postIndex !== -1) {
          currentPosts[postIndex] = updatedPost;
          this.blogPostsSource.next([...currentPosts]);
        }
      },
      error: (e) => console.error('Error updating blog post in Firebase:', e),
    });
  }

  getBlogPostById(postId: string): Observable<BlogPost | undefined> {
    return this.http.get<BlogPost>(`${this.firebaseUrl}/${postId}.json`).pipe(
      map((post) => {
        if (!post) return undefined;
        return { ...post, id: postId };
      })
    );
  }

  getRandomBlogPost(): Observable<BlogPost | null> {
    return this.blogPosts.pipe(
      map((posts) => {
        if (posts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
      })
    );
  }

  getNewestEntry(): Observable<BlogPost | null> {
    return this.blogPosts.pipe(
      map((posts) => {
        if (posts.length === 0) return null;
        posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return posts[0];
      })
    );
  }
}
