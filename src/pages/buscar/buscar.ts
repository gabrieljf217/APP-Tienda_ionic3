import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  productopage = ProductoPage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _ps:ProductosProvider) {

  }

  buscar( ev: any ) {
    const val = ev.target.value;
    this._ps.buscarProducto( val );
  }

  detalle( item:string ){
    this.navCtrl.push( ProductoPage, { 'item': item } );
  }


}
