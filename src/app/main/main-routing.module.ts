import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
  path: "",
  component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../components/components.module').then(m => m.ComponentsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
