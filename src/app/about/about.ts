import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  MatIconModule } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatIconModule, MatAnchor],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
