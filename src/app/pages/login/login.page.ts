import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [
      FormsModule,
      IonButton,
      IonInput,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonLabel,
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ]
  })
  export class LoginPage {
    username: string = '';
    password: string = '';
    loginAttempts: number = 0;

    loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

    constructor(private router: Router) { }

    login() {
      this.loginAttempts++;

      // Could add a timer here to lock the user out for a period of time,
      // this is just to demonstrate different edge cases
      if (this.loginAttempts > 3) {
        alert('Too many failed login attempts. Please try again later.');
        return;
      }

      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        if (username === 'admin' && password === 'admin') {
          this.router.navigateByUrl('/movies');
          this.loginForm.reset();
          this.loginAttempts = 0;
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Please check your input');
      }
    }
  };
