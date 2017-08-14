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

    public currentUser: any;

    constructor(
        public af: AngularFireAuth,
        public db: AngularFireDatabase,
        private usuarioRestService: UsuarioRestService
    ) {
        this.usuarios = db.list('usuarios');
    }


    agregarUsuario(auth: any) {
        let usuario = {
            displayName: auth.displayName,
            email: auth.email,
            photo: auth.photoURL
        };

        this.usuarioRestService.getUsuariosPorEmail(usuario.email).subscribe(
            respuesta => {
                let array = Object.keys(respuesta);
                array.forEach(element => {
                    this.usuarioRestService.deleteUsuario(element).subscribe(
                        elim => {
                        }
                    );
                });
                this.currentUser = this.usuarios.push(usuario);
                console.log(this.currentUser.key);
            }
        );
    }

    editarMensaje(mensaje: any, newValue: string): void {
        this.db.object('/mensajes/' + mensaje.$key)
            .update({ displayName: newValue });
    }

    borrarUsuario() {
        this.usuarios.remove(this.currentUser.key).then(
            _ => {
                console.log("Usuario deslogueado: ", this.currentUser.key);
            }
        );
    }




}



