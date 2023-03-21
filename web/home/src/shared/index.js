import Peer from "peerjs";

export const peer = new Peer(undefined, { port: 443, host: "/" });
export { default as Spinner } from "./Spinner";
