import { Component, OnInit } from '@angular/core';
import { Credential } from 'src/app/model/Credential';
import { Store } from '@ngrx/store';

import { AuthLogin } from '../AuthAction';
import { Router } from '@angular/router';
import { AuthEffects } from '../AuthEffects';
import { LocalStorageService } from 'src/app/storage/local-storage.service';

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
              private router: Router,
              private authEffects: AuthEffects,
              private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.authEffects.login$.subscribe((res: any) => {
      // this.storageService.setItem('user', res.payload);
      this.router.navigate(['/']);
    }, err => console.error(err));
  }

  onSubmit() {
    this.store.dispatch(new AuthLogin(this.credential));

    // this.store.select('user').subscribe(res => {
    // }, err => {
    //   console.error(err);
    // });
  }

}
