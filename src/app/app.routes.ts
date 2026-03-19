import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import {About} from './about/about'
import { CartComponent } from './cart/cart';
import { Product } from './product/product';
import { Login } from './login/login';
import { Top10 } from './top10/top10';

export const routes: Routes = [

     {path:"",component:Top10},
     {path:"home",component:Home},
     {path:"about",component:About},
     {path:"user",component:Profile},
     {path:"cart",component:CartComponent},
     {path:`product/:id`,component:Product},
     {path:"login",component:Login},
     
];
