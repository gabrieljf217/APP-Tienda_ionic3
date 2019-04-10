import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController, MenuController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {

  token:string;
  idUsuario:string;

  constructor(public http: HttpClient,
              private alertCtrl:AlertController) {
    
  }

  ingresar(correo:string, contrasena:string ){
    let data = new FormData();
    data.append("correo",correo);
    data.append("contrasena",contrasena);

    let url = URL_SERVICIOS + "/login";

    return this.http.post( url, data )
      .subscribe( (resp:any) =>{
        let data_resp = resp;
        console.log(data_resp);
        
        if ( data_resp.error ) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: data_resp.mensaje,
            buttons: ["Ok"]
          }).present();
        } else {
          this.token = data_resp.token;
          this.idUsuario = data_resp.id_usuario;
          //guardar storage
        }
      });

  }

}