import { Component } from '@angular/core';
import { HomePage, CategoriasPage, OrdenesPage, BuscarPage} from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home = HomePage;
  categorias = CategoriasPage;
  ordenes = OrdenesPage;
  buscar = BuscarPage;

}
