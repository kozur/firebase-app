import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Usuario } from "../clases/usuario";

@Injectable()
export class UsuarioRestService {

    private usuariosUrl = 'https://lunes24-bd867.firebaseio.com/';  // URL to web api

    constructor(private http: Http) { }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get(this.usuariosUrl + '/usuarios.json')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUsuariosPorEmail(email: string): Observable<Usuario[]> {
        return this.http.get(this.usuariosUrl + '/usuarios.json?orderBy="email"&equalTo="' + email + '"')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteUsuario(key: string): Observable<Usuario[]> {
        return this.http.delete(this.usuariosUrl + '/usuarios/' + key +'.json')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // postServicio(body: object): Observable<any> {
    //     let bodyString = JSON.stringify(body);
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.post(this.personasUrl + '/servicio', body, options)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }
}