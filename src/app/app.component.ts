import { Component } from '@angular/core';
import { Platform, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SignUpPage } from '../pages/signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlayerService } from '../services/player';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SignUpPage;
  isAuthenticated = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth,
    public alertCtrl: AlertController, public ps: PlayerService) {
    platform.ready().then(() => {
      this.afAuth.authState.subscribe((user)=>{
        this.rootPage = user ? TabsPage : SignUpPage;
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });

    
  }


}
