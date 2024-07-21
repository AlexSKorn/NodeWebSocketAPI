import { createInterface } from "readline";

export function promptForUserName(): Promise<string> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question("Please Enter your username: ", (userName) => {
			rl.close();
			resolve(userName);
		});
	});
}
