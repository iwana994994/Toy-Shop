import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  snackBar = inject(MatSnackBar);

  success(message: string) {
    this.snackBar.open(message, '', {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    
    });
   
    }
     error(message: string) {
      this.snackBar.open(message, '', {
        duration: 1500,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      
      });
     }
  }

 

 
