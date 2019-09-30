import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
 // {path:'',component:AdminComponent},
  {path:'adminHome',component:AdminHomeComponent,
children:[
 // {path:'',component:HomeComponent},
  {path:'',component:AdminBooksComponent},
  {path:'issuedBooks',component:IssuedBooksComponent},
  {path:'addBooks',component:EditBookComponent}
]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
