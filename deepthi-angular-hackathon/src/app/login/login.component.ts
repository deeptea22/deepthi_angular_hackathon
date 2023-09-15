import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Base URL
  baseurl = 'http://localhost:3000';
  // Login Form
  public loginForm!: FormGroup;
  // To keep track of form submission
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private customerService: CustomerService) { }

  // Adding Validators
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    });
  }

  // To get all form fields
  get formControl() {
    return this.loginForm.controls;
  }

  // If form is valid, check user
  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.logindata()
    }
  }

  // Check if user already exists
  logindata() {
    this.http.get<any>(this.baseurl + '/customers').subscribe({
      next: (res) => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        // Alert success and navigate to dashboard
        if (user) {
          alert('You have successfully Logged In');
          this.loginForm.reset();
          //set user details in localStorage
          window.localStorage.setItem("email", JSON.stringify(this.loginForm.value.email));
          this.customerService.logIn();
          this.router.navigate(["/dashboard"]);
        } else {
          alert('User Not Found, Please Register');
          this.router.navigate(['/register']);
        }
      },
      error: (err) => {
        alert('Something was wrong');
      }
    })
  }
}
