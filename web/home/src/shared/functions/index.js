import { FemaleAvatar, MaleAvatar, GroupAvatar } from "../../assets/profile";

export function reCaptchaKey() {
  // old key
  // return "6LcjBNwUAAAAAKTI891KWqUqXGlKtj0_IUPn0pTt";
  return "6LelEgIeAAAAAL5AGdN-28dTsu_onOWuxOR1-Gey";
}
export function getUrl(url = "", username) {
  // console.log("Image url", url);

  const back =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:2300"
      : "https://cloud.micple.com";
  //old one
  // return !!url ? `${back}${url}` : "";
  // new one
  return !!url ? `${back}${url}&userName=${username}` : "";
}
export function getUserAvatar(url = "", gender = "", username) {
  // console.log("Image url avatr", url);
  if (url) {
    return getUrl(url, username);
  } else {
    return gender.toLocaleLowerCase() === "female" ? FemaleAvatar : MaleAvatar;
  }
}
export function getGroupAvatar(url) {
  return getUrl(url) || GroupAvatar;
}
