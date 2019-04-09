import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosProvider, CarritoProvider } from "../../providers/index.services";
import { ProductoPage } from '../index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public _ps:ProductosProvider,
              public _cs:CarritoProvider) {

  }

  siguientePagina( infiniteScroll){
    this._ps.cargarTodos()
      .then( ()=>{
        infiniteScroll.complete();
      })
  }

  detalle( item:string ){
    this.navCtrl.push( ProductoPage, { 'item': item } );
  }

}
