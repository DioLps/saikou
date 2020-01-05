import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { environment } from '../../environments/environment';

declare var Email;

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
  public submitedSucess = false;

  public message = 'Sua mensagem foi enviada com sucesso !';
  constructor(private store: Store) {}

  ngOnInit() {}

  public getErrorMessage(field: FormControl) {
    return field.hasError('required')
      ? 'Campo Obrigatório'
      : field.hasError('email')
      ? 'E-mail não válido'
      : '';
  }

  public submitRepport() {
    if (this.supportApplyForm.valid && Email) {
      Email.send({
        SecureToken: environment.tokSmtp,
        From: environment.hostSmtp,
        To: environment.supportMail,
        Subject: 'Support Request',
        Body: `
        Nome: ${this.supportApplyForm.controls.firstName.value} ${this.supportApplyForm.controls.lastName.value}, <br>
        Email: ${this.supportApplyForm.controls.email.value}, <br>
        UrlWhereTheErrorHappens: ${this.supportApplyForm.controls.urlWhereTheErrorHappens.value}, <br>
        Message: ${this.supportApplyForm.controls.message.value}
        `
      })
        .then(message => {
          if (message.includes('OK')) {
            this.submitedSucess = true;
            this.message = 'Sua mensagem foi enviada com sucesso !';
          }
        })
        .catch(error => {
          console.error(error);
          this.submitedSucess = false;
          this.message = 'Houve uma falha, por favor, tente mais tarde !';
        });
    }
  }

  public goBack() {
    this.store.dispatch(new Navigate([`/animes`]));
  }
}
