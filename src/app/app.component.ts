import { Component } from '@angular/core';
import { Auth0Service } from './services/auth0.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    selectedOption = 'string';
    constructor(private auth0Service: Auth0Service){
        this.loginByDialog();
    }

    loginByDialog(err = null){
      this.auth0Service.loginByDialog(err).subscribe(x => {
        console.log('logged in:', x);
      }, err => {
        console.log('error logging in:',err);
        this.loginByDialog(err);
      });
    }
}
