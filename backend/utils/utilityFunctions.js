exports.emailAndPasswordEntered = (email, password) => {
  if (!email || !password) {
    return false;
  } else {
    return true;
  }
};
