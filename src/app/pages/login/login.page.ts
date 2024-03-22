import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
      FormsModule
    ]
  })
  export class LoginPage {
    username: string = '';
    password: string = '';

    constructor(private router: Router) { }

    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.router.navigateByUrl('/home');
      } else {
        alert('Invalid credentials');
      }
    }

  };
