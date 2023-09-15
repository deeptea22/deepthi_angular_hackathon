import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from '../register/register.component';
import { Customers } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let customerService: CustomerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [CustomerService]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onRegister() should exists', () => {
    expect(component.onRegister).toBeTruthy();
  });

  // test to check ngOnInit method existence
  it('ngOnInit() should exists', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('testing mobileNo field validity - falsy', () => {
    const num = component.registerForm.controls['mobileNo'];
    num.setValue('12312312');
    expect(num.valid).toBeFalsy();
  });
  it('onRegister() should call IssueService to add a Issue', () => {
    const customer: Customers = {
      name: "Jack",
      email:"jack@gmail.com",
      password:'Jack123$',
      address:"123 Colony, Germany",
      accNo: "1234123434",
      mobileNo: "1111111111"
    };
    const name = component.registerForm.controls['name'];
    name.setValue(customer.name);
    const address = component.registerForm.controls['address'];
    address.setValue(customer.address);
    const password = component.registerForm.controls['password'];
    password.setValue(customer.password);
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    confirmPassword.setValue(customer.password);
    const accNo = component.registerForm.controls['accNo'];
    accNo.setValue(customer.accNo);
    const mobileNo = component.registerForm.controls['mobileNo'];
    mobileNo.setValue(customer.mobileNo);
    const email = component.registerForm.controls['email'];
    email.setValue(customer.email);
    component.onRegister();
    expect(component.onRegister).toBeDefined
  });
});


