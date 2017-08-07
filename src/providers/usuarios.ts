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
        this.usuarios = db.list('usuarios', { preserveSnapshot: true });

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
        this.eliminarUsuarios(usuario.email);

        this.usuarios.push(usuario);
    }
    eliminarUsuarios(email:string) {
        this.usuarioRestService.getUsuariosPorEmail(email).subscribe(
            respuesta => {
                let array = Object.keys(respuesta);
                array.forEach(element => {
                    this.usuarioRestService.deleteUsuario(element).subscribe(
                        elim => {
                            console.log("Se elimino el usuario: " + element + " respuesta: " + elim);
                        }
                    );
                });
            }
        );
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



