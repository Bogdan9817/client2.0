import { io } from "socket.io-client";

const URI = process.env.REACT_APP_SOCKET_URI || "http://localhost:3000";
export const socketIo = io(URI);
