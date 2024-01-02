// firstName:"",
// lastName:"",
// email:"",
// phoneNumber:"",
// address:"",
// familySize:""
// firstError:"",
// lastError:"",
// emailError:"",
// phoneError:"",
// addressError:"",
// sizeError:""

import { validateEmail } from "../../utils/Email_Password_Validation";

export const useSignup = (signupValue, signupErrors, setSignupError ) => {
  if (!signupValue.firstName) {
    setSignupError({ ...signupErrors, firstError: "first name is required" });

    return;
  }
  if (!signupValue.lastName) {
    setSignupError({ ...signupErrors, lastError: "last name is required" });

    return;
  }
  if (!signupValue.email) {
    setSignupError({ ...signupErrors, emailError: "email is required" });

    return;
  }
  if (!validateEmail(signupValue.email) ) {
    setSignupError({ ...signupErrors, emailError: "enter valid email" });

    return;
  }
  if (!signupValue.phoneNumber) {
    setSignupError({ ...signupErrors, phoneError: "phone number is required" });

    return;
  }
  if (signupValue.phoneNumber.length < 10) {
    setSignupError({ ...signupErrors, phoneError: "Phone number should be minimum 10 digits" });
    return;
  }
  if (!signupValue.address) {
    setSignupError({ ...signupErrors, addressError: "address is required" });

    return;
  }
  if (!signupValue.familySize) {
    setSignupError({ ...signupErrors, sizeError: "family size is required" });

    return;
  }
  if (!signupValue.password) {
    setSignupError({ ...signupErrors,passwordError : "password is required" });

    return;
  }
  if (signupValue.password.length<=7) {
    setSignupError({ ...signupErrors,passwordError : "password must be greater then 7 digits" });

    return;
  }

  if (!signupValue.confirmPassword) {
    setSignupError({ ...signupErrors,confirmError : "confirm password is required" });

    return;
  }

  if (signupValue.confirmPassword!=signupValue.password) {
    setSignupError({ ...signupErrors,confirmError : "confirm password is not match" });

    return;
  }

  return true






};
