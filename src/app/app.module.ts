import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';

import { authReducer } from './reducer/AuthReducer';
import { AuthEffects } from './auth/AuthEffects';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home/home.component';
import { ConversationListComponent } from './conversation/conversation-list/conversation-list.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ConversationDetailComponent } from './conversation/conversation-detail/conversation-detail.component';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { ConversationAddComponent } from './conversation/conversation-add/conversation-add.component';
import { ConversationUsersListComponent } from './conversation/components/conversation-users-list/conversation-users-list.component';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const rootReducer = {
  user: authReducer
};
// const reducers: ActionReducerMap<any> = {user: authReducer};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // return localStorageSync({keys: [{ncchat: ['user']}]})(reducer);
  return localStorageSync({keys: ['user'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<any>[] = [debug, localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    LayoutComponent,
    LoginFormComponent,
    HomeComponent,
    ConversationListComponent,
    ConversationDetailComponent,
    ConversationAddComponent,
    ConversationUsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(rootReducer, {metaReducers}),
    // StoreModule.forFeature('user', authReducer, { metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
