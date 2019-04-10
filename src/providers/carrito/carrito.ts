import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//service
import { UsuarioProvider } from '../usuario/usuario';

//paginas del modal
import { LoginPage, CarritoPage } from "../../pages/index.paginas";
import { URL_SERVICIOS } from '../../config/url.servicios';

import { map } from 'rxjs/operators';

@Injectable()
export class CarritoProvider {

  items:any[] = [];
  totalCarrito:number = 0;
  ordenes:any[] = [];

  constructor(public http: HttpClient,
              public toastCtrl: ToastController,
              private alertCtrl:AlertController,
              private modalCtrl:ModalController,
              private platform:Platform,
              private storage: Storage,
              private _us:UsuarioProvider,
              ) {
    
    this.cargarStorage();
    this.actualizarTotal();
  }

  removerItem( idx:number ){
    this.items.splice(idx,1);
    this.actualizarTotal();
    this.guardarStorage();
  }

  realizarPedido(){
    let data = new FormData();
    let codigos:string[]=[];

    for (let item of this.items ) {
      codigos.push( item.codigo );
      
    }
    data.append("items",codigos.join(","));
    
    let url = URL_SERVICIOS + "/pedidos/realizarOrden/"+ this._us.token + "/" + this._us.id_usuario;

    this.http.post( url, data )
      .subscribe( resp=>{
        let respuesta = resp;

        if ( respuesta['error'] ) {
          //mostrar error
          this.alertCtrl.create({
            title:"Error en la orden",
            subTitle: respuesta['error'],
            buttons: ["Ok"]
          }).present();
        }else{
          this.items = [];
          this.alertCtrl.create({
            title:" Orden realizada!",
            subTitle: "Nos contactaremos con usted próximamente",
            buttons: ["Ok"]
          }).present();
        }
      });
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
          this.modalCtrl.create ( CarritoPage ).present();
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
    this.actualizarTotal();    
    this.guardarStorage();
    const toast = this.toastCtrl.create({
      message: itemParametro.producto+' añadido al carrito',
      duration: 3000
    });
    toast.present();
  }

  actualizarTotal(){
    this.totalCarrito = 0;
    for (let item  of this.items) {
      this.totalCarrito += Number( item.precio_compra );
    }
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

  cargarOrdenes(){
    let url = URL_SERVICIOS + "/pedidos/obtenerPedidos/"+ this._us.token + "/" + this._us.id_usuario;

    this.http.get( url )
      .pipe(map( resp => resp ))
      .subscribe( data =>{
        if ( data['error'] ) {
          //aqui hay un problema
        }else{
          this.ordenes = data['ordenes']; 
        }
      });
    
  }

}
