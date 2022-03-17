// Registration Validation
export function validateRegisterInput(
  username,
  email,
  password,
  confirmPassword
) {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "The username cannot be empty";
  }
  if (email.trim() === "") {
    errors.email = "The email cannot be empty";
  } else {
    const regExp =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regExp)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

// Authorization validation
export function validateLoginInput(username, password) {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
