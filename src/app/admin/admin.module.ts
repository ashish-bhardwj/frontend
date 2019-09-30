import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { IssuedBooksComponent } from './issued-books/issued-books.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPipe } from '../sharedModule/pipes/search-filter';
import { SortByPipe } from '../sharedModule/pipes/sort-by';
import { PipeModule } from '../pipe/pipe.module';
import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [AdminComponent, AdminBooksComponent, IssuedBooksComponent, EditBookComponent, AdminHomeComponent, ChildComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    AngularMaterialModule,
    NgbDropdownModule,
    NgbModule
  ],
  exports:[AdminComponent,AdminBooksComponent,IssuedBooksComponent,AdminHomeComponent]
})
export class AdminModule { }
