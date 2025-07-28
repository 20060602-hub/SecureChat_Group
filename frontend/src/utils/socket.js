const socket = io("https://securechat-group.onrender.com", {
  withCredentials: true,
  transports: ["websocket"]
});
