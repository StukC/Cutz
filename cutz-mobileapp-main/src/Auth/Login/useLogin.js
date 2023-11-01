import { validateEmail } from "../../utils/Email_Password_Validation";
export const useLogin = (email, setEmailError, password, setPasswordError) => {
  if (!email) {
    setEmailError("email is required");
    return;
  }
  if (!validateEmail(email)) {
    setEmailError("enter valid email");

    return;
  }
  if (!password) {
    setPasswordError("password is required");

    return;
  }

  return true;
};
