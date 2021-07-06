import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss'],
})
export class NameEditorComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: [''],
    number: [''],
    address: this.fb.group({
      city: [''],
      street: [''],
    }),
  });

  constructor(private fb: FormBuilder) {}
  onSubmit() {
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
    console.warn(this.profileForm.value);
  }

  ngOnInit(): void {}
}
