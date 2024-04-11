import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: Auth) {}

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }
}
