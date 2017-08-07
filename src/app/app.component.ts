import { Component } from '@angular/core';

import { LoginService } from "../providers/login";
import { UsuariosService } from "../providers/usuarios";

import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public estaLogueado: boolean;
  constructor(public loginService: LoginService, private router: Router, public usuarioService: UsuariosService) {
    this.loginService.af.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('No esta logueado.');
          this.estaLogueado = false;
          this.router.navigate(['login']);
        } else {
          this.loginService.displayName = auth.displayName;
          this.loginService.email = auth.email;
          this.loginService.photoURL = auth.photoURL;
          this.loginService.auth = auth;
          console.log('Logueado correctamente.');
          this.estaLogueado = true;
          this.usuarioService.agregarUsuario(auth);
          this.router.navigate(['home']);
        }
      }
    );

  }
}
