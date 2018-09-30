import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController, AlertOptions } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { SignUpPage } from '../signup/signup';
import { ForgottenPage } from '../forgotten/forgotten';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  signupPage = SignUpPage;
  forgottenPage = ForgottenPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fb: FormBuilder, public loadingCtrl: LoadingController,
    public auth: AuthService, public alertCtrl: AlertController) {
      this.loginForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    const loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this.auth.login(email,password).then((result)=>
    {
      loader.dismiss();
    }).catch(err=>{
      const alert = this.alertCtrl.create({
        message: err.message
      });
      alert.present();
    });
  }

}
