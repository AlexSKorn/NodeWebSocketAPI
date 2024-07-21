import { createServer } from "http";
import { Server, Socket } from "socket.io";

const port = process.env.PORT || 3000;
const httpServer = createServer();
const io = new Server(httpServer, {});

console.log(`Server is listening on ${port}`);

io.on("connection", (socket: Socket) => {
	console.log("Someone connected");

	socket.on("message", (data) => {
		console.log(`\n${data}`);
		socket.broadcast.emit("broadcast", data);
	});

	io.on("disconnect", (socket: Socket) => {
		console.log("Someone disconnected");
	});
});

httpServer.listen(port);
