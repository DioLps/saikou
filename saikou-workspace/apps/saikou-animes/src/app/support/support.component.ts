import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'saikou-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public supportApplyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    urlWhereTheErrorHappens: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit() {}

  public getErrorMessage(field: FormControl) {
    return field.hasError('required')
      ? 'Campo Obrigatório'
      : field.hasError('email')
      ? 'E-mail não válido'
      : '';
  }
}
