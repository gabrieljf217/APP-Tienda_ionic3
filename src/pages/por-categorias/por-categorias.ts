import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from "../../providers/index.services";

import { ProductoPage } from "../index.paginas";

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoriaId:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _ps:ProductosProvider) {
    
    this.categoriaId = this.navParams.get("categoria");
    this._ps.cargarPorCategoria(this.categoriaId.id);
    
  }

  detalle( item:string ){
    this.navCtrl.push( ProductoPage, { 'item': item } );
  }
  

}
