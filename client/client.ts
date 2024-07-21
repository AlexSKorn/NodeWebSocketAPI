import { io } from "socket.io-client";
import { promptForUserName } from "./helpers/commandLineHelpers";
import { createInterface } from "readline";

const socket = io("http://localhost:3000", {
	reconnectionDelayMax: 10000,
});

const readLine = createInterface({
	input: process.stdin,
	output: process.stdout,
});

readLine.on("line", (input: string) => {
	socket.emit("broadcast", { sender: userName, message: input });
});

let userName = "";

socket.on("connect", async () => {
	userName = process.argv[2];
	if (!userName) {
		userName = await promptForUserName();
	}
	console.log(`Welcome ${userName} to the chat!`);
});

socket.on("message", (data: { sender: string; message: string }) => {
	console.log(`${data.sender}: ${data.message}`);
});

socket.on("disconnect", (reason) => {
	console.log(`${userName} has left the chat`);
});
