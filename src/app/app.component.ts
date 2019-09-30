import { Component ,OnInit} from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';
  collapedSideBar: boolean;

  constructor(public toastr: ToastrManager) {}

  ngOnInit() {}

  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }

  showSuccess() {
    this.toastr.successToastr('This is success toast.', 'Success!');
}

showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
}

showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
}

showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
}

showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', {
        position: position
    });
}

}
