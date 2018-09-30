import { Component } from "@angular/core";
import { SignUpPage } from "../../signup/signup";
import { LoginPage } from "../../login/login";

@Component({
    selector: "page-check-email",
    templateUrl: "check-email.html"
})
export class CheckEmailPage{
    public signupPage = SignUpPage;
    public loginPage = LoginPage;
    
    constructor(){}
}