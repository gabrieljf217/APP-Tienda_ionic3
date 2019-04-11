import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _cs:CarritoProvider) {
    this.orden = this.navParams.get("orden");
  }

  borrarOrden( ordenId:String ){
    this._cs.borrarOrden(ordenId)
      .subscribe( data=>{
        if (data['error']) {
          //manejo de errores
        } else {
          this.navCtrl.pop();
        }
      })
  }

}
