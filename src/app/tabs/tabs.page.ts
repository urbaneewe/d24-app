import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline, listOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.html'],
  standalone: true,
  imports: [
    IonTabBar,
    IonTabs,
    IonTabButton,
    IonIcon,
    IonRouterOutlet,
    CommonModule,
    FormsModule
  ]
})
export class TabsPage {

  constructor(private routerOutlet: IonRouterOutlet) {
    addIcons({ listOutline, informationCircleOutline });
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

}
