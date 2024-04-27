import { io } from "../../index.js";
io.on("connection", (socket) => {
  // console.log("New connection");
  socket.emit("newPost", {
    title: "New Post",
    description: "This is a new post",
  });
  socket.on("disconnect", () => {
    
    // console.log("User disconnected");
  });
});
