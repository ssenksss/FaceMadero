import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDatepickerModule,
      MatNativeDateModule,
    ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  userExists = false;

  minDate = new Date(1900, 0, 1);  // 1. januar 1900.
  maxDate = new Date();            // današnji datum

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
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email;
      // ... logika za registraciju
      localStorage.setItem('user', email);
      this.router.navigate(['/home']);
    }
  }
}
