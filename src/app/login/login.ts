import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { ToyService } from '../service/toy.service';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.model';
import { Alerts } from '../alerts';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatAnchor, FormsModule, MatTabsModule, MatStepperModule, MatSelectModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
user: Partial<UserModel> = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',

  }
  categories: any[] = [];
  favoriteCategory: string = '';
  repeat: string = ''
  notification=inject(NotificationService)
  constructor(private router:Router) {
    if (AuthService.getActiveUser()) {
        router.navigate(['/'])
    }
  }
async ngOnInit() {
  await this.getToysCategory();
}
   doLogin(){
    if(AuthService.login(this.user.email!,this.user.password!))
       { this.router.navigate(['/'])
      return}
      alert("Nesto nije u redu")

   }
   doRegistration() {
    if (AuthService.existsByEmail(this.user.email!)) {
      Alerts.error('Email already registred!')
      return
    }

    if (this.user.firstName == '' || this.user.lastName == '' || this.user.address == '' || this.user.phone == '') {
      Alerts.error('All fields should have a value!')
      return
    }

    if (this.user.password!.length < 6) {
      Alerts.error('Password must be at least 6 chars long!')
      return
    }

    if (this.user.password !== this.repeat) {
      Alerts.error('Passwords dont match!')
      return
    }
    this.user.favoriteCategory = this.favoriteCategory;


    console.log(this.user)
    AuthService.createUser(this.user)
    this.router.navigate(['/user'])
    this.notification.success("uspesna prijava")
    

  }

 

async getToysCategory() {
  this.categories = await ToyService.getToysCategory();
}

}
 