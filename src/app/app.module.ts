import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Auth0Service } from './services/auth0.service';
import { ConfigService } from './services/config.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { Configuration } from './interfaces/configuration';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
// @dynamic
@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        PasswordDialogComponent,
        MessageDialogComponent
    ],
    entryComponents: [
        DialogComponent,
        PasswordDialogComponent,
        MessageDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule
    ],
    providers: [
        Auth0Service,
        { provide:
            ConfigService,
            useValue: {
                WebAuthConfig: {
                  domain: 'sitespirit.eu.auth0.com',
                  clientID: 'tqNF2in8RSQkYIFuvjTxGXLZTA1dMEzT',
                  scope: 'openid profile email',
                  responseType: 'token',
                  redirectUri: location.href
                },
                connection: 'Username-Password-Authentication'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class Auth0Module {
    static forRoot(config: Configuration):ModuleWithProviders {
        return {
            ngModule: Auth0Module,
            providers: [
                {
                    provide: ConfigService,
                    useValue: config
                }
            ]
        };
    }
}
