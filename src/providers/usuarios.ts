import { Injectable } from "@angular/core";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { UsuarioRestService } from "../app/services/usuario.service";
import { Usuario } from "../app/clases/usuario";


@Injectable()
export class UsuariosService {

    public usuarios: FirebaseListObservable<any>;
    public local: any[];

    public usuariosRest: any;
    public listaUsuarios: any[];

    constructor(
        public af: AngularFireAuth,
        public db: AngularFireDatabase,
        private usuarioRestService: UsuarioRestService
    ) {
        this.usuarios = db.list('usuarios');

        var dato = firebase.database().ref('usuarios').once('value').then(function (snapshot) {
            snapshot.val();

        });
    }


    agregarUsuario(auth: any) {
        let usuario = {
            displayName: auth.displayName,
            email: auth.email,
            photo: auth.photoURL
        };

        console.log("Antes del getUsuariosPorEmal")
        this.usuarioRestService.getUsuariosPorEmail(usuario.email).subscribe(
            respuesta => {
                console.log("Dentro getUsuariosPorEmail")
                let array = Object.keys(respuesta);
                array.forEach(element => {
                    console.log("ForEach")
                    this.usuarioRestService.deleteUsuario(element).subscribe(
                        elim => {
                            console.log("Se elimino el usuario: " + element + " respuesta: " + elim);
                        }
                    );
                });
                console.log("Despues del Foreach")
                this.usuarios.push(usuario);
                console.log("Despues del push")
            }
        );
        console.log("Despues del getUsuariosPorEmail")
    }

    editarMensaje(mensaje: any, newValue: string): void {
        this.db.object('/mensajes/' + mensaje.$key)
            .update({ displayName: newValue });
    }

    borrarUsuario(usuario: any) {
        console.log(usuario.$key);
        this.usuarios.remove(usuario.$key).then(
            _ => console.log("Usuario deslogueado: ", usuario.email)
        );
    }




}



