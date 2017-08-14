import { Router } from "@angular/router";

import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from "../../providers/login";
import { UsuariosService } from "../../providers/usuarios";
import { FirebaseListObservable } from "angularfire2/database";

import { UsuarioRestService } from "../services/usuario.service";
import { Usuario } from "../clases/usuario";

declare var $: any;



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewChecked{


  name: any;
  email: any;
  photoUrl: any;
  cambio: boolean = false;

  public mensajes: FirebaseListObservable<any>;
  public usuarios: FirebaseListObservable<any>;
  public mensajeNuevo: string;
  public usuariosRest: any;
  public listaUsuarios: any[];

  constructor(
    public loginService: LoginService,
    private router: Router,
    public usuariosService: UsuariosService
  ) {
    this.email = loginService.email;
    this.name = loginService.displayName;
    this.photoUrl = loginService.photoURL;
    this.mensajes = this.loginService.mensajes;

    this.usuarios = this.usuariosService.usuarios;
    this.mensajes.subscribe(x => this.cambio = true);


    window.onbeforeunload = function (e) {
      loginService.salirChat();
      return 'salirChat';
    }
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    if (this.cambio) {
      this.scroll();
    }
  }

  enviarMensaje() {
    this.loginService.enviarMensaje(this.mensajeNuevo);
    this.mensajeNuevo = '';


  }
  scroll() {
    var scrollBar = document.getElementById("ventanaMensajes");
    scrollBar.scrollTop = scrollBar.scrollHeight;
  }

  borrarMensaje(mensaje: string) {
    this.loginService.borrarMensaje(mensaje);
  }

  me(email) {
    if (email == this.loginService.email)
      return true;
    else
      return false;
  }


  desloguear() {
    this.loginService.logout().then((data) => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    });
  }

  editar() {

  }

}
