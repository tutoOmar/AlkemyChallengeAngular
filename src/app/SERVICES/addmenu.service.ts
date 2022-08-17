import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { dish_t } from '../COMPONENTS/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class AddmenuService {


  menu : dish_t[] =[]; //Objeto vector, donde se almacenarán los platos añadidos.
  vegan_count:number=0; //Variables que llevarán el conteo de los platos veganos y no veganos.
  notVegan_count:number=0;

  //Variables de limites de platos

  noMoreVegan:boolean=false;
  noMoreNormal:boolean=false;
  noMoreDishes:boolean=false;


  constructor() { }

  //---- Creación de observables y sus métodos.

  private menuSubject = new Subject<dish_t[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();
  private healthScoreAverageSubject = new Subject<number>();
  private cookingTimeAverageSubject = new Subject<number>();
  private veganStatusSubject = new Subject<number>();
  private notVeganStatusSubject = new Subject<number>();

  get totalAction$():Observable<number>{
    return this.totalSubject.asObservable();
  }
  get quantityAction$():Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get menuAction$():Observable<dish_t[]>{
    return this.menuSubject.asObservable();
  }
    get healthAction$():Observable<number>{
    return this.healthScoreAverageSubject.asObservable();
  }
  get cookingTimeAction$():Observable<number>{
    return this.cookingTimeAverageSubject.asObservable();
  }
  get veganStatusAction$(): Observable<number>{
    return this.veganStatusSubject.asObservable();
  }
  get notVeganStatusAction$(): Observable<number>{
    return this.notVeganStatusSubject.asObservable();
  }

//---- Funciones para actualizar Menu
//--- desde el home se llaman

//Funcion para añadir plato al menú
  updateMenu(dish:dish_t):void{
    this.addMenu(dish);
    this.quantityMenu();
    this.getTotal();
    this.getTotalCookingTime();
    this.getTotalHealthScore();
  }
//Función para quitar plato del menú
  updateMenu2(dish:dish_t):void{
    this.subsMenu(dish);
    this.quantityMenu();
    this.getTotal();
    this.getTotalCookingTime();
    this.getTotalHealthScore();
  }

//--Funciones privadas para actualizar el valor de los guardado en el Menú
// Funciones para añadir
  private addMenu(dish:dish_t):void{
    if(this.menu.length<4){ // condición se cumple cuando hay menos de 4 platos en el menu
      if(dish.vegan == true){ // Pregunta si el plato que se va añadir es vegano o no,
        if(this.vegan_count < 3 ){ //Pregunta si hay menos de 2 platos veganos.
          this.noMoreVegan=false; //En caso afirmativo reinicia bandera de que se puede añadir más veganos
          this.menu.push(dish);//Función que añade el plato mediante el método push en la ultima posición.
          this.menuSubject.next(this.menu); // Se actualiza el obsevable
        }else{
          this.vegan_count--;// En caso de haber más de 2 platos añadidos hace está resta dado que en el home
                             // apenas se hace recibe la señal de añadir plato aumenta el contador en 1 aquí lo restamos
                             //para que nunca pase de 2.
          this.noMoreVegan=true; //activamos la bandera para no poder añadir más platos veganos
          return;
        }
      }else{                  //Condición que dice que el plato no es vegano, en este caso sucede lo mismo que en la parte
                             //Anterior solo con un pequeño cambio de variables
        if(this.notVegan_count < 3){
          this.noMoreNormal=false;
          this.menu.push(dish);
          this.menuSubject.next(this.menu);
        }else{
          this.notVegan_count--;
          this.noMoreNormal=true;
          return;
        }
      }
    }else{//Ya hay 4 platos
      if(this.vegan_count>2){//Este método es para poder restar en 1 porque en el home se sumó pero no se añadieron platos
        this.vegan_count--;
      }
      if(this.notVegan_count>2){
        this.notVegan_count--;
      }
      this.noMoreDishes=true;//La bandera de no más platos se pone en alto para poder mostrar el mensaje de alerta.
      return;
    }
  }
  //Este método toma el tamaño del vector y así saber cuantos platos se han agregado.
  private quantityMenu():void{
    const quantity = this.menu.length;
    this.quantitySubject.next(quantity);
  }
  //en este método, se toma el valor de todos los pricePerServing de cada uno de los menús y luego se suman
  private getTotal():void{
    const total = this.menu.reduce((acum,menu)=> acum += menu.pricePerServing,0);
    this.totalSubject.next(total);
  }
  //Aquí se hace lo mismo que en la función anterior solo que ahora con healthScore
  private getTotalHealthScore():void{
    const total = this.menu.reduce((acum,menu)=> acum+=menu.healthScore,0);
    const Average = total/this.menu.length;
    this.healthScoreAverageSubject.next(Average);
  }
  //Igual con el tiempo de cocina
  private getTotalCookingTime():void{
    const total = this.menu.reduce((acum,menu)=> acum += menu.readyInMinutes,0);
    const Average = (total/this.menu.length)
    this.cookingTimeAverageSubject.next(Average);
  }

//---------------- Función para quitar plato del menú--------------------//
  private subsMenu(dish:dish_t):void{//En esta función recibimos el plato seleccionado
    for(let i in this.menu){          //Hacemos un forIn a los elementos del menú
      if(this.menu[i].id == dish.id){ //Buscamos cual ID del menú coincide con el del seleccionado
        let count:number=parseInt(i); //Guardamos en valor de la variable "i" dado que este número será el que debemos quitar
        this.menu.splice(count,1); //Quitamos el elemento con la función Splice.
        break;  //detenemos el for.
      }
    }
    this.menuSubject.next(this.menu);//Actualizamos el observable.
  }
}
