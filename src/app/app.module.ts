import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

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

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    LayoutComponent,
    LoginFormComponent,
    HomeComponent,
    ConversationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('user', authReducer, { metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
