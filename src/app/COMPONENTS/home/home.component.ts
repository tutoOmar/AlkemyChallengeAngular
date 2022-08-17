import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/SERVICES/api.service';
import { AddmenuService } from 'src/app/SERVICES/addmenu.service';
import { Router } from '@angular/router';

import swal from'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {


  constructor(
    private apiService : ApiService,//Datos de la Api recibidos en este service
    private addMenu:AddmenuService, //Servicio para actualizar el menu añadido
    private router: Router, // Service para dirigir a diferentes rutas
    ) { }

  dish = new Dish(); //Dato donde se irá guardando las letras del plato buscado en el input
  searchV!: any; //Variable donde se obtendrá la respuesta al llamado de la Api de busqueda.Este mismo será recorrido por un ciclo for y enviado dato dato por dato hacia el componente hijo
  init:boolean=false;//Esta variable sería utlizada para recargar la pagina de Home en el momento que no hubiera conten
                    // en la barra de busqueda, al final no se utilizo porque recagarba también menu y no aparecia nada.
                    //Punto para mejorar a futuro

  noMoreVegan:boolean=this.addMenu.noMoreVegan; //Variable que me indica que no se puede seleccionar más platos veganos de 2
  noMoreNotVegan:boolean=this.addMenu.noMoreNormal;//Variable que me indica que no se puede seleccionar más platos no veganos de 2
  noMoreDishes:boolean=this.addMenu.noMoreDishes;//Variable que me indica que no se puede seleccionar más platos porque ya hay los 4 máximo

  ngOnInit(): void {

  }
/**----------------------Leer buscador --------------------- */
/*
  Esta función es llamada cuando el buscador detecta cambios.
  Cuando es llamada recibe el valor de la palabra,

*/
  search(value:string){
    if(value=='' && this.init==true){//Condición que me indica que ya se hizo una busqueda previa esto se sabe por
                                    //la varible init=true solo ocurre cuando ya se arrancarón busquedas.
      this.init=false;              //Variable se reinica
    // this.reloadComponent()       //Llamado a la función para recargar el componente entero.
      return;
    }
    if(value.length>2){ //Sí el valor ingresado tiene 2 o más caracteres se activa este IF
      this.apiService.searchTrack(value).pipe(  //Se llama a la Api para buscar los posibles resultados ante la cadena de caracteres.
      ).
      subscribe(
        res=>{
          this.init=true;     //Inicio la busqueda de productos
          this.searchV = res;
        },
      );
    }
  }

/*-----------------------------------Función para añadir productos ------------------------- */
/*
  Esta función se activa cuando el botón ADD; en el componente hijo de menu-dish, es presionado
  Ese mismo retorna el valor del objeto antes seleccionado.
*/
  addToMenu(dish:dish_t):void{

      if((dish.vegan==true)){   //Condición para saber si el menu es vegano
        this.addMenu.vegan_count++;//Aumenta en caso de ser vegano, la condición de si es mayor o menos es corrobarada en el servicio
        this.addMenu.updateMenu(dish);// Se llama al método updateMenu del service de addmenu para agregar el menu
      }else if((dish.vegan==false)){//Condición para saber si el menu es no vegano
        this.addMenu.notVegan_count++;
        this.addMenu.updateMenu(dish);
      }
      //Dentro del addmenu.service estas banderas cambian de estado, si son falsas activa
      //Un mensaje de Sweet Alert

      if(this.addMenu.noMoreVegan){
        this.addMenu.noMoreVegan=false;
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot add more vegan dishes',
          showConfirmButton: false,
          timer: 1000});
      }
      if(this.addMenu.noMoreNormal){
        this.addMenu.noMoreNormal=false;
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot add more not vegan dishes',
          showConfirmButton: false,
          timer: 1000});
      }
      if(this.addMenu.noMoreDishes){
        this.addMenu.noMoreDishes=false;
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot add more than 4 dishes',
          showConfirmButton: false,
          timer: 1000});
      }
  }

/*-----------------------------------Función para añadir productos ------------------------- */
/*
  Esta función se activa cuando el botón eliminate; en el componente hijo de current-dishes, es presionado
  Ese mismo retorna el valor del objeto antes seleccionado.
*/

  subsToMenu(dish:dish_t):void{

    if((dish.vegan==true)){
      this.addMenu.vegan_count--;//Restamos a la cantida de productos veganos
      this.addMenu.updateMenu2(dish);
      this.noMoreVegan=false; // La bandera que no permite añadir más productos se coloca en false para poder recibir más productos porque si un menu fue eliminado esto significa que hay campo para otro.
    }
    if(dish.vegan==false){
      this.addMenu.notVegan_count--; //Restamos a la cantida de productos No veganos
      this.addMenu.updateMenu2(dish);
      this.noMoreNotVegan=false;// La bandera que no permite añadir más productos se coloca en false para poder recibir más productos porque si un menu fue eliminado esto significa que hay campo para otro.
   }
  }

  //Función para recargar un componente, esta función no será utilizada por el momento. Pero se deja para futuras implementaciones.
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}


//Interface utilizada para guardar el menu incial, al hacer la busqueda los objetos de los menus solo contienen (id,title,image)
export interface menu {
  results:{
    id:number,
    title:string,
    image:string
  }
};

//interface para saber que Dish es de la class Name de tipo  string.
export class Dish{
    Name!:string;
}

//Interface utilizada para saber los datos que utilizaremos en el llamado de la APi por un menu en especifico.
export interface dish_t{
  id:number,
  title:string,
  image:string,
  pricePerServing:number,
  healthScore:number,
  readyInMinutes:number,
  vegan:boolean,
  servings:number,
  aggregateLikes:number
}
