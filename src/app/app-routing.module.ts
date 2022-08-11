import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './COMPONENTS/dish/dish.component';
import { HomeComponent } from './COMPONENTS/home/home.component';
import { LoginComponent } from './COMPONENTS/login/login.component';
import { TestLogComponent } from './COMPONENTS/test-log/test-log.component';
import { PermitionGuard } from './GUARDS/permition.guard';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'home',component:HomeComponent,canActivate:[PermitionGuard]},
{path:'dishes',component:DishComponent,canActivate:[PermitionGuard]},
{path:'testing',component:TestLogComponent},
{path:'**', redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
