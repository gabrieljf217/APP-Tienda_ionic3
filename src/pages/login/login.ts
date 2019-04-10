import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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
              public _us:UsuarioProvider) {
    
  }

  ingresar(){
    this._us.ingresar( this.correo, this.contrasena );
  }

}
