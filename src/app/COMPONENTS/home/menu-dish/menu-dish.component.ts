import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/SERVICES/api.service';


@Component({
  selector: 'app-menu-dish',
  templateUrl: './menu-dish.component.html',
  styleUrls: ['./menu-dish.component.css']
})
export class MenuDishComponent implements OnInit {

  @Input() Menu!: menu;
  @Output() addToMenuClick= new EventEmitter();

  dish!:any;  //Variable que recibe el resultado al llamar la Api de un menu.
  vegan_s:string ='';//Varible para mostrar Yes o No si el objeto es vegano o no.

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.initVal();//Al iniciar el componente arranca esta funcíón.
  }


  /**Función que llama a la API
   * Esta función nace a partir de que desde el padre solo se recibe el ID y el nombre del menu
   * Por tal motivo con ese ID se llamada a otro endpoint de la API donde con el ID podemos obtener la información
   * completa del menú buscado.*/
  initVal(){
    this.apiService.getInfo(this.Menu.id).
    subscribe(res=>{
      this.dish = res;
      if(this.dish.vegan== true){//En caso del menu tener true en vegano se da el valor de YEs a la cadena en vegan_s
        this.vegan_s='Yes'
      }else{
        this.vegan_s='No'
      }
    })
  }

  //Función que emite hacia el padre que se desea añadir un producto.
  addMenu(){
    this.addToMenuClick.emit(this.dish);
  }
}

/* -------------------------------------
* Interface utilizado para recibir
* los datos del menu y enviado a la API el id para obtener los datos completos
* del menu.
-------------------------------------- */
interface menu{
    id:number,
    title:string
}
