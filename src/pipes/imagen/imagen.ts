import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGEN } from '../../config/url.servicios';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform( codigo:string ){
		return URL_IMAGEN + codigo +".jpg";
	}
}
