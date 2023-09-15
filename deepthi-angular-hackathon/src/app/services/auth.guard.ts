export const authGuard = () => {
  if (localStorage.getItem("email")) {
    return true;
  }
  return false;
};
