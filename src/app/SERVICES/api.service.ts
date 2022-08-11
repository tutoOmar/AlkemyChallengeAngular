import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string ='https://api.spoonacular.com/recipes/complexSearch?apiKey=db6b9f48ea4c4e8bb04dfa405933c13b&query?&number=20';
  constructor(private http:HttpClient) { }

  getMenu(){
    return this.http.get(this.url);
  }
}


