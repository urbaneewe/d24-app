import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  inject
} from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, cashOutline } from 'ionicons/icons';
import { MovieResult } from 'src/app/services/interfaces';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.html'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    CurrencyPipe,
    DatePipe,
  ],
})
export class MovieDetailPage {
  private movieService = inject(MovieService);
  public movie: MovieResult | null = null;
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }

  constructor() {
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }
}
