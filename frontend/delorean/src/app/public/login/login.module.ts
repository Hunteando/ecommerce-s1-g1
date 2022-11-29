import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './pages/login.component';


@NgModule({
  declarations: [
    LoginComponent

  ],
  imports: [
    SharedModule
  ]
})
export class LoginModule { }