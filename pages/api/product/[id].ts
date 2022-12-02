import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { IErrorResponse, IGetProductResponse } from "../../../types";

import RealEstate from "../../../models/RealEstate";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IGetProductResponse | IErrorResponse>
) {
	if (req.method === "GET") {
		await dbConnect();
	}

	try {
		const getProductRequest = req.query;

		if (isValidObjectId(getProductRequest.id)) {
			const productId = getProductRequest.id;

			const product = await RealEstate.findOne({ _id: productId });

			const responseData: IGetProductResponse = {
				result: product,
			};

			res.status(200).send(responseData);
		} else {
			const errorResponseData: IErrorResponse = {
				code: "Get product error",
				message: "Validation failed",
			};
			res.status(400).send(errorResponseData);
		}
	} catch (e: any) {
		const errorResponseData: IErrorResponse = {
			code: "Get product error",
			type: e.name,
			message: e.message,
		};

		res.status(500).send(errorResponseData);
	}
}
