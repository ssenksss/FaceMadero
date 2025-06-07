import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome {
  simulirajLogin() {
    localStorage.setItem('user', 'test');
    location.reload();
  }
}
