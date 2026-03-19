import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public generateToyImage(id: number) {
    return `https://toy.pequla.com/img/${id}.png`;
  }
}