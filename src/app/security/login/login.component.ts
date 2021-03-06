import { DataService } from '../dataModel.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toaster:ToastrService,private fb: FormBuilder, private apiService: ApiService, private router: Router,private userData:DataService) { }
  ngOnInit(): void {
  }

  user = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  submit() {
    this.apiService.loginUser(this.user.value).subscribe((res: any) => {
      if (res.data.role === 'general') { 
        this.toaster.success(`Welcome ${res.data.first_name} ${res.data.last_name}`)
        localStorage.setItem("token",res.token)
        this.userData.getData(res.data)
        this.router.navigate(['/employee'])
      }
      else {
        this.toaster.success(`Welcome ${res.data.first_name} ${res.data.last_name}`)
        localStorage.setItem("token",res.token)
        this.userData.getData(res.data)
        this.router.navigate(['/home'])
      }
    }, (err: any) => {
      this.toaster.warning(err.error.msg)
    })
  }
  redirect(){
    this.router.navigate(['/signupg'])
  }
  forgetPassword(){
    this.router.navigate(['/forgetpassword'])
  }
}
