import { Component } from "@angular/core";
import { AuthService } from "../../services/auth";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, Platform, AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { PlayerService } from "../../services/player";

@Component({
    selector: "page-signup",
    templateUrl: "signup.html"
})
export class SignUpPage{
    
    signupForm: FormGroup;
    loginPage = LoginPage;


    constructor(public auth: AuthService, fb: FormBuilder,  
        public loadingCtrl: LoadingController,
        private platform: Platform, private pp: PlayerService, private alertCtrl: AlertController){
        this.signupForm = fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            emailAddress: ['', Validators.email],
            password: ['',[Validators.required, Validators.minLength(6)]],
        });
    }

    public signup(){
        const loader = this.loadingCtrl.create({
            content: "Creating your account..."
        });
        loader.present();
        let email = this.signupForm.controls['emailAddress'].value;
        let password = this.signupForm.controls['password'].value;
        let name = this.signupForm.controls['name'].value;

        this.auth.signup(email,password).then((result)=>
        {
            const alert = this.alertCtrl.create({
                message: JSON.stringify(result)
            });
            alert.present();
            const uid = result['user'].uid;
            this.pp.createPlayer(uid,email, name, null);
            loader.dismiss();
        },(error)=>
        {
            const alert = this.alertCtrl.create({
                message: JSON.stringify(error)
            })
        });
    }


    public signInFacebook(){
        if(this.platform.is('cordova')){
            this.auth.nativeFacebookLogin().then((res)=>{
                let uid = res['user'].uid;
                let name = res['user'].displayName;
                let email = res['user'].email;
                let profilePhoto = res['user'].photoURL;
                this.pp.createPlayer(uid,email, name, profilePhoto);
            }).catch(error=>{
                console.log(error);
            });
        }else{
            this.auth.webFacebookLogin().then((res)=>{
                let uid = res['user'].uid;
                let name = res['user'].displayName;
                let email = res['user'].email;
                let profilePhoto = res['user'].photoURL;
                this.pp.createPlayer(uid,email, name, profilePhoto);
            }).catch(error=>{
                console.log(error);
            });
        }
    }

    public signInGoogle(){
       if(this.platform.is('cordova')){
           this.auth.nativeGoogleLogin().then((res)=>{
               const alert = this.alertCtrl.create({
                   message: res
               });
               alert.present();
               if(res){
                    console.log(res);
                    let uid = res['user'].uid;
                    let name = res['user'].displayName;
                    let email = res['user'].email;
                    let profilePhoto = res['user'].photoURL;

                    this.pp.getPlayer(uid).then((result)=>
                    {
                        this.pp.createPlayer(uid,email, name, profilePhoto);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
           }).catch(error=>{
            const alert = this.alertCtrl.create({
                message: error
            });
            alert.present();
            console.log(error);
        });
       }else{
           this.auth.webGoogleLogin().then((res)=>{
                console.log(res);
                let uid = res['user'].uid;
                let name = res['user'].displayName;
                let email = res['user'].email;
                let profilePhoto = res['user'].photoURL;

                this.pp.getPlayer(uid).then((result)=>
                {
                    this.pp.createPlayer(uid,email, name, profilePhoto);
                },err=>{
                    console.log(err);
                });
           }).catch(error=>{
            console.log(error);
        });
       }
    }

}