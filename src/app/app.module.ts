import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth';
import { SignUpPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import {GooglePlus} from '@ionic-native/google-plus';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { PlayerService } from '../services/player';
import { AngularFirestore } from 'angularfire2/firestore';
import { Facebook } from '@ionic-native/facebook';
import { ProfilePage } from '../pages/profile/profile';
import { CheckEmailPage } from '../pages/forgotten/check-email/check-email';
import { ForgottenPage } from '../pages/forgotten/forgotten';
import { OnboardingPage } from '../pages/onboarding/onboarding';

import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {Camera} from '@ionic-native/camera';
import { FileService } from '../services/file';
import {FilePath} from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';


const firebaseConfig = {
  apiKey: "AIzaSyDBk-Sw4dx9zHI_lIf_nh4ZbfUDQbdkOPo",
  authDomain: "starfishbadminton.firebaseapp.com",
  databaseURL: "https://starfishbadminton.firebaseio.com",
  projectId: "starfishbadminton",
  storageBucket: "starfishbadminton.appspot.com",
  messagingSenderId: "925773802154"
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SignUpPage,
    LoginPage,
    ProfilePage,
    CheckEmailPage,
    ForgottenPage,
    OnboardingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SignUpPage,
    LoginPage,
    ProfilePage,
    CheckEmailPage,
    ForgottenPage,
    OnboardingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, GooglePlus, PlayerService, AngularFirestore, Facebook,
    Geolocation, NativeGeocoder, Camera,FileService, FilePath, PhotoViewer

  ]
})
export class AppModule {}
