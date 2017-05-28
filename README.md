# Intro

This project is an Angular X alternative to the Auth0-lock. Aim is to keep this light weight by using existing popular packages such as Material2 components for the UI and the official FormsModule for validation.

## Installation

Run `npm install ngx-auth0 --save`

Add Auth0Module to your project:

`import { Auth0Module } from 'ngx-auth0';`

`Auth0Module.forRoot({
    WebAuthConfig: {
        domain: 'xxxx.xx.auth0.com',
        clientID: 'xxxxxxxxxxxxxxxxx',
        scope: 'openid app_metadata'
    },
    connection: 'Username-Password-Authentication'
}`

Add Auth0Service to your component or service:

`import { Auth0Service } from 'ngx-auth0';`

## Methods

### login()

Requires object containing username, password and connection. Returns observable.

### loginWithCredentials()

Requires object containing username, password and connection. Returns observable.

### loginByDialog()

Shows a login modal similar to the Auth0-lock modal, but with Material UI style. Returns observable.

### logout()

Logs the user out and redirects the user back to your application.
