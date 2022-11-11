declare global {
	var mongoose: any;
}

export const mongoose = global.mongoose || new Connection();

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production")
	global.mongoose = mongoose;
