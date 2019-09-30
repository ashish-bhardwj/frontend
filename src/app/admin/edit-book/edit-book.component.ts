import { Component, OnInit, Input } from '@angular/core';
import { BooksComponent } from 'app/books/books.component';
import { IBook } from 'app/model/books';
import { AdminService } from 'app/sharedModule/service/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/sharedModule/service/user.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookform: FormGroup;
  submitted = false;
  text='Signup to continue';
  defaultQuestion:String='2';
  bookChange: boolean=true;

  APIbooks:any[];
  isBookPresent:boolean;
  googleBook:any={};
  constructor(
    private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private adminService:AdminService,
    private flashMessage:FlashMessagesService,
    public toastr: ToastrManager) { 
      this.bookform = this.formBuilder.group({
        'bookTitle': ['',Validators.required],
        'topic': ['',Validators.required],
        'author': ['',[Validators.required]],
        'description': ['', [Validators.required]],
        'rating': ['', [Validators.required]],
        'count': ['', [Validators.required]],
        'issued': ['', [Validators.required]]
      });

  }

  ngOnInit() {
  }

  selectOption(event){
    this.bookChange=!this.bookChange;
  }

  get f() { return this.bookform.controls; }

  resetForm(bookform:FormGroup){
    if(bookform)
    bookform.reset();
    this.adminService.selectedBook={
      bookTitle:"",
      topic:"",
      author:"",
      cost:null,
      description:"",
      rating:null,
      count:null,
      issued:null
    }

  }

  search(bookname:String){
   var flashMessage=this.flashMessage;
   if(bookname==="")
     return 
   this.adminService.fetchGoogleBook(bookname)
   .subscribe(
     (data:any) => {
       this.APIbooks = data.items;
       this.isBookPresent= true },
     error => { 
       alert('Unable to find books...Enter details manually');
       console.log("hello Errorr ", error)
      
     }
   );
   
 }

 show(index:number){
  var flashMessage=this.flashMessage;
   console.log("i:"+index);
   this.adminService.bookData=this.APIbooks[index];

     let book:IBook={
     _id:"",
     bookTitle:this.adminService.bookData.volumeInfo.title,
     topic:this.adminService.bookData.volumeInfo.categories,
     author:this.adminService.bookData.volumeInfo.authors,
   //  cost:this.adminService.bookData.saleInfo.listPrice.amount,
     description:this.adminService.bookData.volumeInfo.description,
     rating:this.adminService.bookData.volumeInfo.averageRating,
     count:5,
     issued:false,
     imageUrl:this.adminService.bookData.volumeInfo.imageLinks.smallThumbnail
   }
   console.log(this.adminService.bookData.volumeInfo.title);
   this.adminService.postBooks(book).subscribe((res)=>{
     this.resetForm(this.bookform);
     this.toastr.successToastr('Book added successfully.', 'Success!');
   });
  
   
 }



 onSubmit(){
  this.submitted = true;
  if (this.bookform.invalid) {
  // add toast msg saying....fill all the fields
    return;
}
   console.log(this.bookform.controls.bookTitle.value);
  var flashMessage=this.flashMessage;
     this.adminService.postBooks(this.bookform.value).subscribe((res)=>{
       this.resetForm(this.bookform);
       flashMessage.show('Book successfully added', {cssClass: 'alert-success', timeout: 1000});
     });
  }


}
