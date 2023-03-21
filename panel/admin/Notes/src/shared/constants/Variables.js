// Fixing Node_Env issue with environment
// const environment = 'production';
const environment = "development";

export const BACKEND_URL =
  environment === "development"
    ? "http://127.0.0.1:2100/ap"
    : `${window.location.origin}/ap`;
export const BACKEND_URL_Micple_App =
  environment === "development"
    ? "http://127.0.0.1:2000/web"
    : "https://micple.com/web";

//here need to fix
export const PROMOTIONS_BACKEND_URL =
  environment === "development"
    ? "http://127.0.0.1:10001/api/v1"
    : `${window.location.origin}/api/v1`;

export const audioTypes = ["audio/mp3", "audio/wav", "audio/ogg", "audio/mpeg"];
export const imageTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
export const videoTypes = ["video/mp4", "video/webm", "video/ogg"];
