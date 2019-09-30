import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { HeaderComponent } from 'app/header/header.component';
import { HeaderModule } from 'app/header/header.module';

@NgModule({
  declarations: [BooksComponent, BookDetailComponent, MyBooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    HeaderModule
  ],
  exports:[BooksComponent,BookDetailComponent,MyBooksComponent]
})
export class BooksModule { }
