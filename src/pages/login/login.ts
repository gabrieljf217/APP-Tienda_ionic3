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
    let loading = this.loadingCtrl.create({
      content: 'Verificando'
    });
    loading.present();
    if( this._us.ingresar( this.correo, this.contrasena )){
      loading.dismiss();
      this.viewCtrl.dismiss(true);
    } 
  }
}
