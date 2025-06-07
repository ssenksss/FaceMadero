import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

interface User {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  adresa: string;
  datumRodjenja: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,MatButtonModule, MatInputModule],
})
export class Profile {

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<Profile>,
    @Optional() @Inject(MAT_DIALOG_DATA) public userData: User
  ){
    // Formu kreiramo sa podacima iz userData
    this.profileForm = this.fb.group({
      ime: [{ value: userData.ime, disabled: true }],
      prezime: [{ value: userData.prezime, disabled: true }],
      email: [{ value: userData.email, disabled: true }],
      telefon: [userData.telefon, [Validators.required, Validators.minLength(6)]],
      adresa: [userData.adresa, Validators.required],
      datumRodjenja: [{ value: userData.datumRodjenja, disabled: true }],
    });
  }

  save() {
    if (this.profileForm.valid && this.dialogRef) {
      this.dialogRef.close(this.profileForm.getRawValue());
    }
  }

  cancel() {
    if (this.dialogRef) {
      this.dialogRef.close(null);
    }
  }

}
