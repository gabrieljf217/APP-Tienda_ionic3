import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public _us:UsuarioProvider,
              public loadingCtrl:LoadingController) {
    
  }

  ingresar(){
    if( this._us.ingresar( this.correo, this.contrasena )){
      this.viewCtrl.dismiss(true);
    } 
    //})
    //TODO: crear loading
    // const loader = this.loadingCtrl.create({
    //   content: "Por favor espere...",
    //   duration: 2000
    // });
    // loader.present();
  }//TODO: revisar video todo para eliminar todos inecesarios

}
