import { io } from "socket.io-client";

// const URL = 'http://localhost:8000'
const URL = 'https://sketchboard-p4sh.onrender.com'
export const socket = io(URL);