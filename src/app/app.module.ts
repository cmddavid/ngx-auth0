import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule, MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Auth0Service } from './services/auth0.service';
import { ConfigService } from './services/config.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { Configuration } from './interfaces/configuration';

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdDialogModule,
        MdButtonModule,
        MdInputModule
    ],
    providers: [
        Auth0Service,
        { provide:
            ConfigService,
            useValue: {
                WebAuthConfig: {
                    domain: 'xxx.eu.auth0.com',
                    clientID: 'xxx',
                    scope: 'openid app_metadata'
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
