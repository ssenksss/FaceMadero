import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome {}  // Ime klase samo Welcome, bez WelcomeComponent
