import { Schema } from "mongoose";
import { INotifications } from "../types";

export const notificationsSchema = new Schema<INotifications>({
	location: { type: String, required: true },
	type: { type: String, required: true },
	priceMin: { type: Number, required: true },
	priceMax: { type: Number, required: true },
	discordWebhook: { type: String, required: true },
});


