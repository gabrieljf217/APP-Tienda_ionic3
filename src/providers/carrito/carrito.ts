import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@Injectable()
export class CarritoProvider {

  items:any[] = [];

  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              public toastCtrl: ToastController,
              private platform:Platform,
              private storage: Storage) {
    
    this.cargarStorage();
  }

  agregarCarrito( itemParametro:any ){
    for (let item of this.items ) {
      if (item.codigo == itemParametro.codigo) {
        this.alertCtrl.create({
          title: itemParametro.producto+" ya existe",
          subTitle: "en su carrito de compra",
          buttons: ["Ok"]
        }).present();
        return;
      }
      
    }
    this.items.push( itemParametro );
    this.guardarStorage();
    const toast = this.toastCtrl.create({
      message: itemParametro.producto+' añadido al carrito',
      duration: 3000
    });
    toast.present();
  }

  private guardarStorage(){
    if (this.platform.is('cordova')) {
      //dispositivo
      this.storage.set('items', this.items);
    }else{
      //computadora
      localStorage.setItem('items', JSON.stringify( this.items ));
    }
  }

  cargarStorage(){
    let promesa = new Promise( (resolve,reject)=>{
      if (this.platform.is('cordova')) {
        //dispositivo
        this.storage.ready()
          .then( ()=>{
            this.storage.get('items')
              .then( items =>{
                if (items) {
                  this.items = items;
                }
                resolve();
              });
        });
      }else{
        //computadora
        if ( localStorage.getItem('items') ) {
          //existe items en el local storage
          this.items = JSON.parse( localStorage.getItem('items') );
        }
        resolve();
      }
    });
    return promesa;
  }

}
