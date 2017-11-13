import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { ConfigService } from './config.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// this service should have angular versions of all methods at https://auth0.com/docs/libraries/auth0js/v8

@Injectable()
export class Auth0Service {

    auth0: any;

    constructor(private config: ConfigService, public dialog: MatDialog) {
        let configObj:any = Object.assign({},this.config['WebAuthConfig']); // hack to prevent type issue, i'm not sure how to really fix this
        this.auth0 = new auth0.WebAuth(configObj);
    }

    loginWithCredentials(config:any):Observable<any>{
        return new Observable(observer => {
            this.auth0.popup.loginWithCredentials(config, (err,result) => {
                if(err){
                    console.log(err);
                } else {
                    observer.next(result);
                }
            });
        });
    }

    login(config:any):Observable<any>{
        config.realm = config.connection;
        return new Observable(observer => {
            this.auth0.client.login(config, (err,result) => {
                if(err){
                    console.log(err);
                } else {
                    observer.next(result);
                }
            });
        });
    }

    logout(config:any){
        this.auth0.client.buildLogoutUrl(config);
    }

    loginByDialog():Observable<any>{
        let that = this;
        let observer = new Subject();
        let dialogRef = that.dialog.open(DialogComponent, {disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if(result != null){
                result.connection = that.config['connection'];
                that.login(result).subscribe(res => {
                    observer.next(res);
                });
            }
        });
        return observer;
    }

}
