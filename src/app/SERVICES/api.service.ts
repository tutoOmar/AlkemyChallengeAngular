import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

/**
 * Apis Keys de prueba
 * Estas apis vienen de distintos correos, y fueron utilizadas porque al principio con muchas llamadas se cumplia el
 * tope de la API, entonces se cambiaba de api para cada caso
 */

  apiKey1:string = 'db6b9f48ea4c4e8bb04dfa405933c13b';//ApiKey correo 1
  apiKey2:string='0315c630f3574c01adc737406ae6638d';//ApiKey correo 2
  apiKey3:string='6c2ef2366396461eae520aa79efb7124' //ApiKey correo 3
  apiKey4:string='c189b586fc2147078cf6f4d15897ee58'//ApiKey correo 4
  /**Variable almacena el mensaje que es recibido de la barra de busqueda. */
  search:string='';

  //Url utilizadas en la aplicación
  //1. Esta es la URL que hace el autocomplete
  urlDinamic:string=`https://api.spoonacular.com/recipes/autocomplete?apiKey=${this.apiKey4}&number=8&query=`;
  //En esta url se busca un plato en especifico utilizando el ID
  urlInfo:string='https://api.spoonacular.com/recipes/';

  constructor(private http:HttpClient) { }
  //Funcion para llamar la api en el endpoint de autocomplete, para buscar los productos, el number fue colocado en 8
  //Para no saturar la aplicacion de opciones pero se puede modificar
  searchTrack(word:string){
    this.search=word;
    return this.http.get(this.urlDinamic+word);
  }
  //Función encargada de busca un plato en especifico en función del ID
  getInfo(id:number){
    return this.http.get(this.urlInfo+id+'/information?apiKey='+this.apiKey4+'&?includeNutrition=false');
  }
}


