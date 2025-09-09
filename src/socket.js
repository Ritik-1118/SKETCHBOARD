import { io } from "socket.io-client";

/**
 * The URL of the socket server.
 * @type {string}
 */
const URL = 'http://localhost:8000'

/**
 * The socket client instance.
 * @type {import("socket.io-client").Socket}
 */
export const socket = io(URL);