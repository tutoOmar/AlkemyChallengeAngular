import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiKey1:string = 'db6b9f48ea4c4e8bb04dfa405933c13b';//Omi_17
  apiKey2:string='0315c630f3574c01adc737406ae6638d';//Ifrit360

  url:string ='https://api.spoonacular.com/recipes/complexSearch?apiKey=0315c630f3574c01adc737406ae6638d&query?&number=20';
  urlData:string='https://api.spoonacular.com/food/menuItems/';
  constructor(private http:HttpClient) { }

  getMenu(){
    return this.http.get(this.url);
  }
  getInfo(id:number){
    return this.http.get(this.urlData+id)
  }
}


