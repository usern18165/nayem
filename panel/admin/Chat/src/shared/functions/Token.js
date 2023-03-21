import jwt_decode from "jwt-decode";

export function adminHeader() {
  return { Authentication: `Bearer ${localStorage.getItem('t')}` };
}
export function userHeader() {
  return { Authentication: `Bearer ${localStorage.getItem('u_t')}` };
}

export function decodeToken() {

  try {
    const token = localStorage.getItem('t');
    // console.log(" test Token", token)
    if (typeof token === "string") {
      let decoded = jwt_decode(token);
      // console.log('get roles', decoded);
      return decoded;
    }
  } catch (err) {

  }

  return;

}
