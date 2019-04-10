import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//service
import { UsuarioProvider } from '../usuario/usuario';

//paginas del modal
import { LoginPage, CarritoPage } from "../../pages/index.paginas";


@Injectable()
export class CarritoProvider {

  items:any[] = [];

  constructor(public http: HttpClient,
              public toastCtrl: ToastController,
              private alertCtrl:AlertController,
              private modalCtrl:ModalController,
              private platform:Platform,
              private storage: Storage,
              private _us:UsuarioProvider,
              ) {
    
    this.cargarStorage();
  }

  verCarrito(){

    let modal:any;
      if ( this._us.token ) {
        //mostrar pagina del carrito
        modal = this.modalCtrl.create( CarritoPage ); 
      } else {
        //mostrar modal
        modal = this.modalCtrl.create( LoginPage ); 
      }
      modal.present();

      modal.onDidDismiss( (abrirCarrito:boolean)=>{
        if ( abrirCarrito ) {
          this.modalCtrl.create ( CarritoPage );
        }
      });
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
