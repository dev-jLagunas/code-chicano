import { Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  constructor(private afAuth: Auth) {
    onAuthStateChanged(this.afAuth, (user) => {
      this.isLoggedIn.set(!!user);
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.afAuth, email, password).then(
      (cred) => {
        this.isLoggedIn.set(true);
        return cred;
      }
    );
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.isLoggedIn.set(false);
    });
  }
}
