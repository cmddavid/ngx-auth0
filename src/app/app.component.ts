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
        /*this.auth0Service.loginWithCredentials({
            connection: 'x',
            username: 'x',
            password: 'x'
        });*/
        this.loginByDialog();
    }

    loginByDialog(){
        this.auth0Service.loginByDialog().subscribe(x => {
            console.log('logged in:', x);
        });
    }
}
