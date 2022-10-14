export const isTokenExpired = (token: string) => {
  if (!!token && token !== '') {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const today = Math.floor(new Date().getTime() / 1000);
    return today >= expiry;
  }
  return true;
};
