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
import { CharacterService } from 'src/app/services/character.service';
import { type Result } from 'src/app/services/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.html'],
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
export class CharacterDetailPage {
  private characterService = inject(CharacterService);
  public character: Result | null = null;
  public imageBaseUrl = 'https://rickandmortyapi.com/api/character/avatar/';

  @Input()
  set id(characterId: string) {
    this.characterService.getCharacterDetails(characterId).subscribe((character) => {
      this.character = character;
    });
  }

  constructor() {
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }
}
