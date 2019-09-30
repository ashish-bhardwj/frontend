import { Component, OnInit } from '@angular/core';
import { Issue } from '../../model/issue';
import { Router } from '@angular/router';
import { AdminService } from '../../sharedModule/service/admin.service';

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css']
})
export class IssuedBooksComponent implements OnInit {

  pageTitle = 'Books Issued to users';
  list: Issue[] =[];

  constructor(private adminService:AdminService,
    private router: Router) {

  }

         
  ngOnInit() {
    this.getMyList();
  }

  getMyList(){
    this.adminService.getIssuedList().subscribe((res)=>{
      console.log(res);
      this.list=res as Issue[];
    });
  }

  goBack(): void {
    this.router.navigate(['/adminBooks']);
  }


}
