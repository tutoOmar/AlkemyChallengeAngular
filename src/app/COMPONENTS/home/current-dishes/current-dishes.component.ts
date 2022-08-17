import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AddmenuService } from 'src/app/SERVICES/addmenu.service';

@Component({
  selector: 'app-current-dishes',
  templateUrl: './current-dishes.component.html',
  styleUrls: ['./current-dishes.component.css']
})
export class CurrentDishesComponent {

  /********* Declaración de las variables que toman el valor de los
   *  observables, que vienen desde el service de addmenu y son actualizables.
   * *************** */
  quantity$ = this.addMenu.quantityAction$;
  total$=this.addMenu.totalAction$;
  menu$ = this.addMenu.menuAction$;
  healthScore$ =this.addMenu.healthAction$;
  cookingTime$ = this.addMenu.cookingTimeAction$;
  vegan_cont$ = this.addMenu.veganStatusAction$;
  notVegan_cont$=this.addMenu.notVeganStatusAction$;

  //Declaraición de variables
  dish:menu[]=[];
  value!:boolean;
  /*    Esta señal de salida se ejecuta
  *| cuado  el botón (eliminate) es presionado y va hacia el componente padre HOME
  */
  @Output() subsToMenuClick = new EventEmitter();

  constructor(private addMenu:AddmenuService) { }

  /*Esta función se activa al presiona el botón Eliminate, cuando se ejecuta, toma el valor del objeto que fue
  seleccionado y lo envia a la función como parametro.
  */
  eliminate(item:menu){
    this.subsToMenuClick.emit(item);//Aquí lo emitimos al componente padre HOme
  }
}


interface menu{
  id:number,
  title:string,
  pricePerServing:number,
  healthScore:number,
  readyInMinutes:number,
  vegan:boolean
}


