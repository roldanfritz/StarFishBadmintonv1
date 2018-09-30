import firebase from 'firebase';
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
        try {
      
          const gplusUser = await this.gplus.login({
            'webClientId': "161143830923-gn578dd1r64mter6tu19h9v4kne5hehf.apps.googleusercontent.com",
            'offline': true,
            'scopes': 'profile email'
          });
      
          return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
      
        } catch(err) {
          console.log(err)
        }
      }

      async webGoogleLogin(): Promise<any> {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          return await this.afAuth.auth.signInWithPopup(provider);
      
        } catch(err) {
          console.log(err)
        }
      }

      nativeFacebookLogin(): Promise<any>
      {
          return this.fb.login(["public_profile"]);
      }

      webFacebookLogin() : Promise<any>{
        try {
          const provider = new firebase.auth.FacebookAuthProvider();
          return this.afAuth.auth.signInWithPopup(provider);
      
        } catch(err) {
          console.log(err)
        }
      }

      sendForgottenPassword(email:string)
      {
        return this.afAuth.auth.sendPasswordResetEmail(email);
      }
}