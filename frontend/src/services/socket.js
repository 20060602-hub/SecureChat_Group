// services/socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
  secure: true,
  withCredentials: true,
  autoConnect: false, // ✅ you manually connect in components
});

export default socket;
