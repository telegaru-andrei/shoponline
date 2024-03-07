import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemService} from "../services/item.service";
import {ListItemsComponent} from "../list-items/list-items.component";

@Component({
  selector: 'java64-home',
  standalone: true,
  imports: [
    // MatCard,
    // MatCardContent
    MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButton, ReactiveFormsModule, ListItemsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  itemForm: FormGroup;


  constructor(formBuilder:FormBuilder, private itemService: ItemService) {
    this.itemForm = formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      imageUrl: ["", Validators.required],
      price: ["", Validators.required]
    });
    this.itemService.read();
  }
  onSave(): void{
    if (this.itemForm.valid){
      console.log(this.itemForm.value);
      this.itemService.create(this.itemForm.value).subscribe((response: any) =>{
        console.log(response);
        alert(response.message);
        // dupa fiecare actiune de create, edit, delete apelam read() pt a actualiza informatiile din baza de date
        this.itemService.read();
      });
    } else {
      alert("Formularul este invalid");
    }
  }
}

