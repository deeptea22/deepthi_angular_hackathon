import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerService } from '../services/customer.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [CustomerService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onRegister() should call IssueService to add a Issue', () => {
    const customer = {
      email: "admin@gmail.com",
      password: 'Admin202#',
    };
    const password = component.loginForm.controls['password'];
    password.setValue(customer.password);
    const email = component.loginForm.controls['email'];
    email.setValue(customer.email);
    component.onLogin();
    expect(component.onLogin).toBeDefined
  });
});
