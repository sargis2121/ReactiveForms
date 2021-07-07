import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss'],
})
export class NameEditorComponent implements OnInit {
  isValidFormSubmitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  profileForm = this.fb.group({
    firstName: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/Vazgen/i),
      ]),
    ],
    lastName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(4)]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ]),
    ],
    number: [
      '',
      Validators.compose([Validators.required, Validators.minLength(9)]),
    ],
    aliases: this.fb.array([this.fb.control('')]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm.get('email')?.setValidators(Validators.email);
  }

  onSubmit() {
    console.warn(this.profileForm.get('firstName'));
    console.warn(this.profileForm.get('aliases'));
    if (this.profileForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.profileForm.reset();
  }

  get email() {
    return this.profileForm.get('email');
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get number() {
    return this.profileForm.get('number');
  }
}
