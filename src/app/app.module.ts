import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { CategoriasPage,
        CarritoPage,
        HomePage,
        LoginPage,
        OrdenesPage,
        OrdenesDetallePage,
        PorCategoriasPage,
        ProductoPage,
        TabsPage,
        BuscarPage } from "../pages/index.paginas";

//providers

import { CarritoProvider,
        ProductosProvider,
        UsuarioProvider, } from '../providers/index.services';

//pipes
import { ImagenPipe } from '../pipes/imagen/imagen';

//storage
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CategoriasPage,
    CarritoPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriasPage,
    CarritoPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
