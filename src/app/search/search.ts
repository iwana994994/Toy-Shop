import { Component, EventEmitter, Output,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-search',
  imports: [FormsModule,
    MatButton,
    MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  @Input() types: string[] = [];
  @Input() age: string[] = [];
  @Input() Group: string[] = [];
  @Input() ratingOptions: number[] = [];
  @Output() filtersChanged = new EventEmitter<any>();
  selectedAge = '';
  selectedGroup=''
  minRating: number = 0;
  


  type = '';
  targetGroup = '';
  ageGroup = '';
  from = 0;
  to = 0;

  
  search() {
    this.filtersChanged.emit({
     
      type: this.type,
      targetGroup: this.selectedGroup,
      ageGroup: this.selectedAge,
       minRating: this.minRating,
      from: this.from,
      to: this.to
    });
  }

reset() {
  Alerts.confirm('Are you sure you want to reset filter?', () => {
    this.type = ''
    this.targetGroup = ''
    this.ageGroup = ''
    this.minRating = 0
    this.from = 0
    this.to = 0

    this.filtersChanged.emit({
      searchText: '',
      type: '',
      targetGroup: '',
      ageGroup: '',
       minRating: 0,
      from: 0,
      to: 0
    });

    window.location.reload();
  });
}
}