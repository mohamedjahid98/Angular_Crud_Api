import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/Modal/User';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private service: ApiService) {
    this.LoadCustomer();
  }
  customerdata: UserData[] = [];
  ngOnInit(): void {
  }

  // Show all users
  LoadCustomer() {
    this.service.LoadUser().subscribe((data: any) => {
      this.customerdata = data;
    });
  }

  // Delete a users
  delete(ID: any) {
    this.service.RemoveUser(ID).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully deleted User!",
        showConfirmButton: false,
        timer: 1500
      });
      this.LoadCustomer();
      console.log(data,'Deleted')
    });
  }
}
