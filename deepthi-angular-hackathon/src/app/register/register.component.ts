import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { passwordCheck } from './password-check';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Base URL
  baseurl = 'http://localhost:3000';
  // Registration Form
  public registerForm!: FormGroup;
  // To keep track of form submission
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: CustomerService, private http: HttpClient) { }

  // Validating the fields
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      name: ["", Validators.required],
      address: ["", Validators.required],
      accNo: ["", Validators.required],
      mobileNo: ["", [
        Validators.required,
        Validators.pattern(
          "[0-9]{10}"
        )
      ]],
      confirmPassword: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          )
        ]
      ]
    }, {
      validator: passwordCheck("password", "confirmPassword")
    });
  }

  // Get all form fields
  get formControl() {
    return this.registerForm.controls;
  }

  // On successful registration, user is re-directed to Login
  onRegister(): void {
    this.http.get<any>(this.baseurl + '/customers').subscribe({
      next: (res) => {
        const user = res.find((a: any) => {
          return a.email === this.registerForm.value.email
        });
        // If user already exists, taken to login
        if (user) {
          alert('User Already Exists, please login');
          this.registerForm.reset();
          this.router.navigate(["/login"]);
        } else {
          delete this.registerForm.value['confirmPassword']
          this.submitted = true;
          if (this.registerForm.valid) {
            // Adding the user by calling http post from services
            this.service.addCustomer(this.registerForm.value).subscribe({
              next: (res) => {
                alert('Registration Successful, Please Login')
                this.router.navigate(["/login"]);
              },
              error: (err) => {
                alert('Something went wrong')
              }
            });
            console.log(this.registerForm.value);
          }
        }
      },
      error: (err) => {
        alert('Something was wrong');
      }
    })

  }
}
