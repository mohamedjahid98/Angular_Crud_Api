import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //Declare property
  messageclass = ''
  message = ''
  customerid: any;
  editdata: any;
  responsedata: any;
  formData: any = {};
  isEditMode = false;

  constructor(private service: ApiService, private route: ActivatedRoute, private _router: Router, private toastr: ToastrService) {

    this.customerid = this.route.snapshot.paramMap.get('id');
    if (this.customerid != null) {
      this.UpdateCustomer(this.customerid);
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
  }

  register = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    age: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });

  //save a user
  SaveCustomer() {
    if (this.register.valid) {
      console.log(this.register.value, 'show');
      this.service.SaveUser(this.register.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          if (this.responsedata.message == 'added') {
            this.message = "User saved successfully."
            this.messageclass = "sucess"
            console.log(this.responsedata, 'add')
            this.clearCustomer();
            this.toastr.success("User saved successfully")

            this._router.navigate(["user"])
          } else if (this.responsedata.message == 'updated') {
            this.message = "User updated successfully."
            this.messageclass = "updated"
            this._router.navigate(["user"])

          } else {
            this.message = "Failed to Save"
            this.messageclass = "error"

          }

        }
      });
    } else {
      this.message = "Please Enter valid data"
      this.messageclass = "error"
    }
  }

  //after submit form is clear
  clearCustomer() {
    this.register = new FormGroup({
      id: new FormControl(""),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl(""),
      age: new FormControl(""),
      gender: new FormControl(""),
      phone: new FormControl(""),
    });
  }

  // update a existing users
  UpdateCustomer(Id: any) {
    this.service.LoadUserbycode(Id).subscribe(data => {
      this.editdata = data;
      this.register = new FormGroup({
        id: new FormControl(this.editdata.id),
        firstName: new FormControl(this.editdata.firstName),
        lastName: new FormControl(this.editdata.lastName),
        email: new FormControl(this.editdata.email),
        age: new FormControl(this.editdata.age),
        gender: new FormControl(this.editdata.gender),
        phone: new FormControl(this.editdata.phone),
      });
    });

  }

  // Submit form in user(add and update)
  submitForm() {
    if (this.isEditMode) {
      this.service.updateData(this.customerid, this.register.getRawValue()).subscribe(response => {
        console.log('updated successfully:', response);
        Swal.fire("", 'Successfully Updated..', 'success')
        this._router.navigate(["user"])
      }, error => {
        console.error('Error updating item:', error);
      });
    } else {
      this.service.SaveUser(this.register.value).subscribe(result => {
        console.log('added successfully:', result);
        Swal.fire("", 'Successfully Added..', 'success')
        this._router.navigate(["user"])
      }, error => {
        console.error('Error adding item:', error);
      });
    }
  }

  get name() {
    return this.register.get("firstName");
  }
  get lastName() {
    return this.register.get("lastName");
  }
  get email() {
    return this.register.get("email");
  }
  get phone() {
    return this.register.get("phone");
  }
  get age() {
    return this.register.get("age");
  }
  get gender() {
    return this.register.get("gender");

  }
}
