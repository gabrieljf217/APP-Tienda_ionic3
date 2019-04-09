import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from "../../config/url.servicios";

import { map } from 'rxjs/operators';

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos:any[] = [];
  categorias:any[] = [];
  porCategorias:any[] = [];

  constructor(public http: HttpClient) {
  
    this.cargarTodos();
    this.cargarLineas();
  }

  cargarLineas(){
    let url = URL_SERVICIOS + "/lineas";
    this.http.get( url )
      .pipe(map( resp => resp ))
      .subscribe( data =>{
        if ( data['error'] ) {
          //aqui hay un problema
        }else{
          this.categorias = data['lineas'];
          console.log(data['lineas']);        
        }
      });
  }

  cargarPorCategoria( id:number ){
    let url = URL_SERVICIOS + "/productos/porTipo/"+id;
    this.http.get( url )
      .pipe(map( resp => resp ))
      .subscribe( data =>{
        if ( data['error'] ) {
          //aqui hay un problema
        }else{
          this.porCategorias = data['productos'];
          console.log(data['productos']);  
        }
      });
  }

  cargarTodos(  ){

    let promesa = new Promise( ( resolve, reject )=>{

      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.http.get( url )
        .pipe(map( resp => resp ))
        .subscribe( data =>{
          if ( data['error'] ) {
            //aqui hay un problema
            
          }else{
            this.productos.push( ...data['productos'] );
            this.pagina += 1;
          }
          resolve();
        });
    });
    return promesa;
  }

}
