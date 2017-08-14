import { Injectable } from "@angular/core";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { UsuariosService } from "../providers/usuarios";

@Injectable()
export class LoginService {

    user: Observable<firebase.User>;
    public mensajes: FirebaseListObservable<any>;
    public displayName: string;
    public email: string;
    public photoURL: any;

    constructor(public af: AngularFireAuth, public db: AngularFireDatabase, public usuarioService: UsuariosService) {
        this.mensajes = db.list('mensajes');
    }

    loginWithGoogle() {
        let obj: any = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        return obj;
    }

    logout() {
        this.usuarioService.borrarUsuario();        
        return this.af.auth.signOut();
    }
    salirChat(){
        this.usuarioService.borrarUsuario();
    }

    enviarMensaje(text: string) {
        let mensaje = {
            mensaje: text,
            displayName: this.displayName,
            email: this.email,
            timestamp: Date.now(),
            photoURL: this.photoURL
        };
        this.mensajes.push(mensaje);
    }

    borrarMensaje(mensaje: any) {
        this.mensajes.remove(mensaje.$key).then(
            _ => console.log("Mensaje borrado")
        )
    }




}



