import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { ConfigService } from './config.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { PasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { Observable ,  Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// this service should have angular versions of all methods at https://auth0.com/docs/libraries/auth0js/v8

@Injectable()
export class Auth0Service {

    auth0: any;

    constructor(private config: ConfigService, public dialog: MatDialog, private http: HttpClient) {
        let configObj:any = Object.assign({},this.config['WebAuthConfig']); // hack to prevent type issue, i'm not sure how to really fix this
        if(configObj.hasOwnProperty('redirectUri') === false || configObj.redirectUri === null){
          configObj.redirectUri = location.href;
        }
        this.auth0 = new auth0.WebAuth(configObj);
    }

    loginWithCredentials(config:any):Observable<any>{
        if(this.config.proxyUrl != null){
          return this.http.post(`${this.config.proxyUrl}/sign-in`,{ credentials: config });
        } else {
          return new Observable(observer => {
              this.auth0.popup.loginWithCredentials(config, (err,result) => {
                  if(err){
                      console.log(err);
                      //this.loginByDialog(err);
                      observer.error(err);
                  } else {
                      observer.next(result);
                  }
              });
          });
        }
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

    changePassword(){
      let dialogRef:any = this.dialog.open(PasswordDialogComponent, {disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          this.auth0.changePassword({
            connection: 'Username-Password-Authentication',
            email:   result.email
          }, ((err, resp) => {
            let dialogRef:any = this.dialog.open(MessageDialogComponent, {disableClose: true});
            dialogRef.componentInstance = err ? err.message : resp;
          }));
        }
      });
    }

    loginByDialog(err = null):Observable<any>{
        let that = this;
        let observer = new Subject();
        let dialogRef:any = that.dialog.open(DialogComponent, {disableClose: true});
        if(err != null){
          dialogRef.componentInstance.err = err;
        }
        dialogRef.afterClosed().subscribe(result => {
            if(result != null && result !== 'change-password'){
                result.connection = that.config['connection'];
                that.loginWithCredentials(result).subscribe(res => {
                    observer.next(res);
                }, err => {
                  observer.error(err);
                });
            } else if(result != null && result === 'change-password'){
              this.changePassword();
              observer.error('Canceled login to change password');
            } else {
              observer.error('Canceled login');
            }
        });
        return observer;
    }

}
