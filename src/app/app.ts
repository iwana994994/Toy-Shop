import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
MatButtonModule,
MatIconModule
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 authService= AuthService

  constructor(private router: Router) {}

  doLogout() {
    AuthService.logout()
    this.router.navigate(['/login'])
  }
}