import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckEmailPage } from './check-email/check-email';

@Component({
  selector: 'page-forgotten',
  templateUrl: 'forgotten.html',
})
export class ForgottenPage {
  public resetForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthService, public fb: FormBuilder) {
      this.resetForm = fb.group({
        email: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgottenPage');
  }

  resetPassword(){
    let email = this.resetForm.controls["email"].value;
    this.auth.sendForgottenPassword(email).then((result)=>
    {
      this.navCtrl.setRoot(CheckEmailPage);
    })
  }

}
