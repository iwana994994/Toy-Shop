import { Component, signal, inject, } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon"
import { ToyModel} from '../../models/toy.model';
import { ToyService } from '../service/toy.service';
import {UtilsService} from "../service/utils.service"
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-top10',
  imports: [MatCardModule,MatButtonModule,MatIconModule,RouterLink,MatProgressSpinnerModule],
  templateUrl: './top10.html',
  styleUrl: './top10.css',
})
export class Top10 {
  toys = signal<ToyModel[]>([]);
  filteredToys = signal<ToyModel[]>([]);
   utils = inject(UtilsService);
    girlsToys = signal<ToyModel[]>([]);
boysToys = signal<ToyModel[]>([]);
  constructor() {
     ToyService.getToys()
      .then((data) => {
        this.toys.set(data);
        this.filteredToys.set(data);
        console.log(this.toys)

     this.girlsToys.set(
     data.filter((toy: ToyModel) => toy.targetGroup.toLowerCase() === 'devojčica').slice(0, 10)
    
    );

       this.boysToys.set(
      data.filter((toy:ToyModel) => toy.targetGroup.toLowerCase() === 'dečak').slice(0, 10)
  );
       console.log("GIRLS: ",this.girlsToys )
       console.log(this.boysToys)
      })
      .catch((err) => console.error(err));

      
    }
    scrollLeft(container: HTMLElement) {
  container.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

scrollRight(container: HTMLElement) {
  container.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}

    
}
