import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ViewController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  @ViewChild('onboard') slide: Slides;
  public onboardingForm: FormGroup;
  public options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
  };
  public location: any;
  public coords: any;
  public currentPlayer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController,
    private fb: FormBuilder, private pp: PlayerService, private viewCtrl: ViewController) {
      this.location = null;
      this.onboardingForm = fb.group({
        locationDecode: ['', Validators.required],
        coords: ['', Validators.required],
        gender: ['', Validators.required],
        reasonForJoining: ['',Validators.required],
        skillLevel: ['',Validators.required]
      });
  }

  ionViewDidLoad() {
    this.currentPlayer = this.navParams.data;
  }

  next()
  {
    this.slide.slideNext();
  }

  previous()
  {
    this.slide.slidePrev();
  }

  isEnd()
  {
    return this.slide.isEnd();
  }

  isStart()
  {
    return this.slide.isBeginning();
  }

  slideChange()
  {
    let currentIndex = this.slide.getActiveIndex();
    if(currentIndex == 1)
    {
      this.geolocation.getCurrentPosition().then((success)=>
      {
        this.coords = success.coords;
        this.nativeGeocoder.reverseGeocode(success.coords.latitude, success.coords.longitude, this.options)
          .then((result: NativeGeocoderReverseResult[]) => {
            this.location = result[0];
          })
          .catch((error: any) => console.log(error));
      }).catch((error)=>
      {
        console.log(error);
      });
    }
  }

  complete()
  {
    let updateObj = {
      location: this.location,
      coords: {latitude: this.coords.latitude, longitude: this.coords.longitude},
      gender: this.onboardingForm.controls['gender'].value,
      reasonForJoining: this.onboardingForm.controls["reasonForJoining"].value,
      skillLevel: this.onboardingForm.controls["skillLevel"].value,
      onboardComplete: true
    };

    this.pp.updatePlayer(this.currentPlayer.uid, updateObj).then((success)=>
    {
      const alert = this.alertCtrl.create({
        message: "Your profile is done!"
      });
      alert.present();
      this.viewCtrl.dismiss();
    });
  }

}
