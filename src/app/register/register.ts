import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  userExists = false;

  // Simulacija baze korisnika
  private existingUsers = ['postojeci@korisnik.com'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.registerForm.value.email;

    // Provera da li korisnik postoji (simulacija)
    if (this.existingUsers.includes(email)) {
      this.userExists = true;
      return;
    }

    // Registracija uspešna
    this.userExists = false;
    alert('Uspešno ste registrovani!');

    // Preusmeri na login
    this.router.navigate(['/login']);
  }
}
