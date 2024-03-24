import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AlertController,
  InfiniteScrollCustomEvent,
  IonAlert,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonRouterOutlet,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { catchError, finalize } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonBadge,
    IonAvatar,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    IonAlert,
    DatePipe,
    RouterModule,
  ],
})
export class MoviesPage implements OnInit {
  private movieService = inject(MovieService);

  private currentPage = 1;
  public movies: any[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public isLoading = true;
  public error = null;

  // Placeholder array for the initial load
  public placeholderArray = new Array(10);

  constructor(private router: Router, private alertController: AlertController, private routerOutlet: IonRouterOutlet) {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.loadMovies();
  }

  ionViewDidEnter() {
    // Disable swipe to go back to login page since we have a
    // dedicated logout button
    this.routerOutlet.swipeGesture = false;
  }

  ionViewWillLeave() {
    // Re-enable swipe to go back so that child pages can use it
    this.routerOutlet.swipeGesture = true;
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    // Only show loading indicator on initial load
    if (!event) {
      this.isLoading = true;
    }

    const movieService: MovieService = this.movieService;
    movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res: any) => {
          this.movies.push(...res.results);

          // Resolve the infinite scroll promise
          event?.target.complete();

          // Disable the infinite scroll when we reach the end of the list
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Do you really want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
