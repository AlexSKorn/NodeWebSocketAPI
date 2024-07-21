interface User {
	name: string;
	Chat(message: string): void;
	Disconnect(): void;
	Connect(): void;
}

class ChatUser implements User {
	name: string;
	private isConnected: boolean = false;
	constructor(name: string) {
		this.name = name;
	}

	Connect(): void {
		this.isConnected = true;
		console.log(`${this.name} has connected to the server`);
	}

	Disconnect(): void {
		this.isConnected = false;
		console.log(`${this.name} has disconnected from the server`);
	}

	Chat(message: string): void {
		if (!this.isConnected) {
			console.log("User is not connected");
			return;
		}
		console.log(`${this.name}: ${message}`);
	}
}

export default User;
