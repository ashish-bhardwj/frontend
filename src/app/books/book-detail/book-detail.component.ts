import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../../model/books';
import { BookService } from '../../sharedModule/service/book.service';
import { Issue } from 'app/model/issue';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  pageTitle = 'Book Name';
  errorMessage = '';
  book: IBook | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private flashMessage:FlashMessagesService,
    public toastr: ToastrManager) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getBook(id);
    }
  }

  getBook(id:string){
    this.bookService.getBook(id).subscribe((res)=>{
      this.book=res as IBook;
    });
  }

    

  reserveBook(book:IBook){
    let userId=JSON.parse(localStorage.getItem('user'));
    let issue:Issue={
      user_id:userId.user_id,
      firstName:userId.firstName,
      email:userId.email,
      book_id:book._id,
      bookTitle:book.bookTitle
    }
    console.log(issue);
    this.bookService.issueBook(issue).subscribe(data => {
      var flashMessage=this.flashMessage;
      if(data.success){
        this.toastr.successToastr('Book issued successfully.', 'Success!');
        book.issued=true;
      } else {
        this.toastr.errorToastr('Something went wrong','Error!');
      }
    });
  }



  onBack(): void {
    this.router.navigate(['/book']);
  }


}
