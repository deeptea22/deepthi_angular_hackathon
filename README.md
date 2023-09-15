
# Angular Hackathon
### Default Login
Email: admin@gmail.com

Password: Admin202#

### Structure
- User is given 'Login' page first. If not a user already, taken to Register.
- Login has two values:
	- Email
	- Password
- Registration has four values:
	- Email
	- Name
  - Address
  - Account Number
  - Mobile Number
	- Password
	- Confirm Password
- If Login Successful, user moves to Dashboard Page which consists of Payment Wallet Homepage

### Validation
- Check if user already exists
- Check if user doesn't exist
- Check if mobile number is 10 digits
- Check if all fields are given
- Check if email is a valid email
- Check if password and confirmPassword are same

### Password Strength
- Password should be alphanumeric
- A letter of the password should be capital
- Password must contain a special character (@, $, !, &, etc)
- Password length must be greater than 7 characters

### Jasmine Test Cases
- Written for registration and login
- Present in test folder