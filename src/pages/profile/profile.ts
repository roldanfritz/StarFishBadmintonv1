import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayerService } from '../../services/player';
import { AuthService } from '../../services/auth';
import { OnboardingPage } from '../onboarding/onboarding';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  currentPlayer : any = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public ps: PlayerService, public auth: AuthService,
    public modalCtrl: ModalController) {
    
  }

  ionViewDidEnter(){
    this.ps.getCurrentUser().then((res)=>
      {
        res.subscribe((player)=>{
          this.currentPlayer = player;
          console.log(!this.currentPlayer.onboardComplete);
          if(!this.currentPlayer.onboardComplete)
          {
            const onboard = this.modalCtrl.create(OnboardingPage);
            onboard.present();
          }
        })
      });
  }

  logout(){
    this.auth.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
