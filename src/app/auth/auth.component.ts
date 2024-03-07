import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  // ? in acest caz reprezinta null operator, permite ca variiabila sa fie initializata mai tarziu
  //
  authForm?: FormGroup;
  viewType: string = "login";

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // this.authForm = this.formBuilder.group({});
    this.onSetViewType('login');
  }

  onRegister(): void {
    if (this.authForm!.valid) {
      console.log(this.authForm!.value);
      const body = this.authForm!.value;
      this.authService.register(body).subscribe((response:any)=>{
        console.log(response);
      })
    } else {
      alert("formularul este invalid");
    }
  }

  onSetViewType(viewType: string): void {
    console.log(viewType);
    this.viewType = viewType;
    switch (this.viewType){
      case 'login':
        this.authForm = this.formBuilder.group({
          email: ["", Validators.required],
          password: ["", Validators.required],
        });
        break;
      case 'register':
        this.authForm = this.formBuilder.group({
          username: ["", Validators.required],
          email: ["", Validators.required],
          password: ["", Validators.required],
          rePassword: ["", Validators.required]
        });
        break;
    }
  }
  onLogin(): void{
    if (this.authForm!.valid){
      console.log(this.authForm!.value);

      const body = this.authForm!.value;
      this.authService.login(body).subscribe((response:any) =>{
        console.log(response);
      })
    } else {
      alert("Formularul este invalid");
    }
  }
}
