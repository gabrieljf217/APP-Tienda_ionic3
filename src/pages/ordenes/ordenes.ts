import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _cs:CarritoProvider) {
    
  }

  ionViewWillEnter() {
    this._cs.cargarOrdenes();
  }

  detalle( orden:string ){
    this.navCtrl.push(OrdenesDetallePage, { 'orden': orden});
  }

}
