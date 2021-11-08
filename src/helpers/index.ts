export const a = () => {};

export const logout = () => {
  window.location.replace('/login');
  window.localStorage.clear();
};
