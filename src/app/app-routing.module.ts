import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { ViewComponent } from './Components/view/view.component';
import { AddComponent } from './Components/add/add.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "user", component: UserComponent,
    children: [{
      path: "", component: ViewComponent
    },
    { path: "create", component: AddComponent },
    { path: "Edit/:id", component: AddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
