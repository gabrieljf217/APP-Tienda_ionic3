import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController, Platform } from 'ionic-angular';

//pluginstorage
import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;

  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              private storage: Storage,
              private platform:Platform) {
    this.cargarStorage();
  }

  activo():boolean{
    if (this.token) {
      return true;
    }else{
      return false;
    }
  }

  ingresar(correo:string, contrasena:string ){
    let data ={
      "correo":correo,
      "contrasena":contrasena
    }
    console.log("DATA ", data);
    

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
          this.id_usuario = data_resp.id_usuario;
          //guardar storage
          this.guardarStorage();
          
        }
      });

  }

  private guardarStorage(){
    if (this.platform.is('cordova')) {
      //dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    }else{
      //computadora
      if (this.token) {
        localStorage.setItem('token', this.token); 
        localStorage.setItem('id_usuario', this.id_usuario );   
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');      
      }
    }
  }

  cargarStorage(){
    let promesa = new Promise( (resolve,reject)=>{
      if (this.platform.is('cordova')) {
        //dispositivo
        this.storage.ready()
          .then( ()=>{
            this.storage.get('token')
              .then( token =>{
                if (token) {
                  this.token = token;
                }
              });
            this.storage.get('id_usuario')
              .then( id_usuario =>{
                if (id_usuario) {
                  this.id_usuario = id_usuario;
                }
                resolve();
            });
        });
      }else{
        //computadora
        if ( localStorage.getItem('token')){
          //existe items en el local storage
          this.token = localStorage.getItem('token') ;
          this.id_usuario = localStorage.getItem('id_usuario') ;
        }
        resolve();
      }
    });
    return promesa;
  }

  cerrarSesion(){
    this.token = null;
    this.id_usuario = null;
    //guardar storage
    this.guardarStorage();
  }

}