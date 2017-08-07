import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from './app.component';

import { firebaseConfig } from "../config.private";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, FirebaseAuthStateObservable } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterializeModule } from 'angular2-materialize';

// Servicios
import { LoginService } from "../providers/login";
import { UsuariosService } from "../providers/usuarios";
import { UsuarioRestService } from "./services/usuario.service";

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, UsuariosService, UsuarioRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
