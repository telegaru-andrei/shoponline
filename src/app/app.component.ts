import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Andrei';
  version: number = 1;
}

//   public void printMessage(String message){
//
// }
//   public printMessage(message: string): any{
//     if(1>0) {
//       return 1;
//     } else {
//       return "text";
//     }
//   }
// }
