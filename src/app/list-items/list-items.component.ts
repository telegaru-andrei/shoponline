import { Component } from '@angular/core';
import {Item} from "../models/item.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    MatButton
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  itemList: Array<Item> = [];
  constructor(private itemService: ItemService) {
    itemService.getItemList().subscribe((itemListFromService: Array<Item> ) =>{
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
}
