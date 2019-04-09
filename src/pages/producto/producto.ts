import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  item:any={};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _cs:CarritoProvider) {

    this.item = this.navParams.get("item");
  }

}
