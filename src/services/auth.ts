import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import {Facebook} from '@ionic-native/facebook';

@Injectable()
export class AuthService{
    constructor(public afAuth:AngularFireAuth,
       private gplus: GooglePlus, public fb: Facebook){}

    signup(email:string, password:string){
      return firebase.auth().createUserWithEmailAndPassword(email,password);
    }   
    
    login(email:string, password:string)
    {
      return this.afAuth.auth.signInWithEmailAndPassword(email,password);
    }

    logout(){
      firebase.auth().signOut();
    }

    async nativeGoogleLogin(): Promise<any> {
      
      const gplusUser = await this.gplus.login({
        'webClientId': "925773802154-aq45orcbmuip5178meg3pbo1o32bire8.apps.googleusercontent.com",
        'offline': true,
        'scopes': 'profile email'
      });

      console.log("GPLUS USER IS " + gplusUser);
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
    }

    async webGoogleLogin(): Promise<any> {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this.afAuth.auth.signInWithPopup(provider);
    }

    nativeFacebookLogin(): Promise<any>
    {
      return this.fb.login(["public_profile"]);
    }

    webFacebookLogin() : Promise<any>{
      const provider = new firebase.auth.FacebookAuthProvider();
      return this.afAuth.auth.signInWithPopup(provider);
    }

    sendForgottenPassword(email:string)
    {
      return this.afAuth.auth.sendPasswordResetEmail(email);
    }
}