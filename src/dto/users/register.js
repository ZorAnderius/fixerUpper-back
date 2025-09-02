import LoginUser from "./login.js";

class RegisterUser extends LoginUser {
  constructor(body) {
    super({ email: body.email, password: body.password })
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.phoneNumber = body.phoneNumber;
  }
}

export default RegisterUser;