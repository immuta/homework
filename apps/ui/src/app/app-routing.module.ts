import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  component: DashboardComponent,
  path: '',
}, {
  path: 'not-found',
  component: NotFoundComponent
}, {
  path: '**',
  redirectTo: 'not-found'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
