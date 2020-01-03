import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { AuthGuard } from "./components/auth/auth.guard";

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], data: {roles: ["user", "admin"]} , loadChildren: './components/main/main.module#MainModule' },
  { path: 'signup', loadChildren: './components/signup/signup.module#SignupModule' },
  { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
  { path: 'admin', canActivate:[AuthGuard], data: {roles: ["admin"]} ,loadChildren: './components/admin/admin.module#AdminModule' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
