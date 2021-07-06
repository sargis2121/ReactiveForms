import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss'],
})
export class NameEditorComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/Vazgen/i),
      ]),
    ],
    lastName: ['',Validators.compose([
      Validators.required,
      Validators.minLength(4)
    ])],
    email: ['',Validators.compose([
      Validators.required,
      Validators.minLength(7)
    ])],
    number: ['',Validators.compose([
      Validators.required,
      Validators.minLength(9)
    ])],
    address: this.fb.group({
      city: ['',Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      street: ['',Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  constructor(private fb: FormBuilder) {}
  onSubmit() {
    console.warn(this.profileForm.value.firstName);
    console.warn(this.profileForm.get('aliases'));
    this.profileForm.patchValue({
      firstName: [''],
      lastName: [''],
      email: [''],
      number: [''],
      address: {
        city: [''],
        street: [''],
      },
    });
   
  }
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  get firstName() {return this.profileForm.value.firstName}

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  ngOnInit(): void {console.warn(this.profileForm.value);}
}
