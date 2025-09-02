class RegisterUser {
  constructor(body) {
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.email = body.email;
    this.password = body.password;
    this.phoneNumber = body.phoneNumber;
  }
}

export default RegisterUser;