import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
  {path:'',component:BooksComponent},
  {path: 'book/:id',component:BookDetailComponent},
  {path:'myBooks',component:MyBooksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
