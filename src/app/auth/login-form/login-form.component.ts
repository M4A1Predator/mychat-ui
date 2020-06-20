import { Component, OnInit } from '@angular/core';
import { Credential } from 'src/app/model/Credential';
import { Store } from '@ngrx/store';

import { AuthLogin } from '../AuthAction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.styl']
})
export class LoginFormComponent implements OnInit {

  credential: Credential = new Credential();

  isLoading = false;
  enableBtn = true;
  errMsg = '';

  constructor(private store: Store<any>,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store.dispatch(new AuthLogin());

    this.store.select('user').subscribe(res => {
      this.router.navigate(['/']);
    });
  }

}
