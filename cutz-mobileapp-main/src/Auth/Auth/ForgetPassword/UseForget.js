import { validateEmail } from "../../utils/Email_Password_Validation";
export const UseForget = (passwordValue, forgetErrors, setForgetErrors) => {

  if (!passwordValue?.password) {
    setForgetErrors({
      ...forgetErrors,
      passwordError: "new password is required",
    });
    return;
  }
  if (passwordValue.password.length <= 7) {
    setForgetErrors({
      ...forgetErrors,
      passwordError: "password must be greater then 7 digits",
    });
    return;
  }

  if (!passwordValue?.confirmPassword) {
    setForgetErrors({
      ...forgetErrors,
      confirmError: "confirm password is required",
    });

    return;
  }
  if (passwordValue.confirmPassword != passwordValue.password) {
    setForgetErrors({
      ...forgetErrors,
      confirmError: "confirm password is not match",
    });

    return;
  }

  return true;
};
