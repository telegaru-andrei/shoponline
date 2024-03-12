import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../models/item.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    MatButton,
    NgIf
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  // @output ne ajuta sa definim unu eveniment prin care trimitem datele din listitems in pagina de home/dashboard
  @Output() updateDataEvent: EventEmitter<Item> = new EventEmitter<Item>();
  itemList: Array<Item> = [];

  // ascunde butoanele de update si delete cand suntem pe pagina de home si afiseaza butonul de buy
  @Input({transform: booleanAttribute, alias: "showByButton"}) showByButton: boolean = true;


  constructor(private itemService: ItemService) {
    this.itemService.getItemList().subscribe((itemListFromService: Array<Item> ) =>{
      this.itemList = itemListFromService;
    })
  }

  onDelete(item: Item){
    console.log(item);
    this.itemService.delete(item.id).subscribe((response:any) =>{
      console.log(response)
      this.itemService.read();
    })
  }

  onUpdate(item: Item){
    console.log(item);
    // metoda edit() trimite itemul in pagina de home/dashboard, apeleaza evenimentul updateData
    this.updateDataEvent.emit(item)
  }

  onBuy(item: Item){
    console.log(item);

  }
}
