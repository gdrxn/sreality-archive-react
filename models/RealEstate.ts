import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { IRealEstate } from "../types";

const realEstateSchema = new Schema<IRealEstate>({
	name: { type: String, required: true },
	location: { type: String, required: true },
	url: { type: String, required: true, unique: true },
	price: { type: Number, required: true },
	priceHistory: { type: [Number], required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	images: { type: [String], required: true },
});

const RealEstate =
	mongoose.models.RealEstate ||
	model<IRealEstate>("RealEstate", realEstateSchema);
export default RealEstate;
