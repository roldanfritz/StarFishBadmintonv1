import { Component } from '@angular/core';
import { SignUpPage } from '../signup/signup';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;

  constructor() {

  }
}
