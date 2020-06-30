import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthLogout } from 'src/app/auth/AuthAction';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthEffects } from 'src/app/auth/AuthEffects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  isLoggedIn = false;

  constructor(private store: Store<any>,
              private authService: AuthService,
              private authEffects: AuthEffects,
              private router: Router) { }

  ngOnInit(): void {
    this.sub.add(this.authService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res;
    }));

    this.sub.add(
      this.authEffects.logout$.subscribe(res => {
        this.router.navigate(['/']);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.store.dispatch(new AuthLogout());
  }

}
