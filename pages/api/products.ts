import type { NextApiRequest, NextApiResponse } from "next";

import {
	IGetProductsRequest,
	IGetProductsResponse,
	IErrorResponse,
	IRealEstate,
} from "../../types";

import RealEstate from "../../models/RealEstate";
import dbConnect from "../../lib/dbConnect";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IGetProductsResponse | IErrorResponse>
) {
	if (req.method === "GET") {
		await dbConnect();

		try {
			const getProductsRequest: IGetProductsRequest = req.query;

			const page = getProductsRequest.page || 1;
			const limit = getProductsRequest.limit || 12;
			const searchTerm = getProductsRequest.term;
			const priceMin = getProductsRequest.min || 0;
			const priceMax = getProductsRequest.max || Infinity;
			const type = getProductsRequest.type;
			const sort = getProductsRequest.sort;

			if (!isNaN(priceMin) && !isNaN(priceMax) && priceMin > priceMax) {
				const errorResponseData: IErrorResponse = {
					code: "Get products error",
					message: "Validation failed",
				};
				res.status(400).send(errorResponseData);
				return;
			}
			let results: IRealEstate[];

			let params = {};

			if (searchTerm) {
				params = {
					...params,
					location: { $regex: new RegExp(".*" + searchTerm + ".*", "i") },
				};
			}

			if (priceMin <= priceMax) {
				params = {
					...params,
					price: { $gte: priceMin, $lte: priceMax },
				};
			}

			if (type === "House" || type === "Apartment") {
				params = {
					...params,
					type: type,
				};
			}

			if (sort?.includes("date")) {
				if (sort === "date-asc") {
					results = await RealEstate.find(params).sort({ _id: "asc" });
				} else {
					results = await RealEstate.find(params).sort({ _id: "desc" });
				}
			} else if (sort?.includes("price")) {
				if (sort === "price-asc") {
					results = await RealEstate.find(params).sort({ price: "asc" });
				} else {
					results = await RealEstate.find(params).sort({ price: "desc" });
				}
			} else {
				results = await RealEstate.find(params).sort({ _id: "desc" });
			}

			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;

			const responseData: IGetProductsResponse = {
				currentProducts: results.slice(startIndex, endIndex),
				productsLength: results.length,
			};

			res.status(200).send(responseData);
		} catch (e: any) {
			const errorResponseData: IErrorResponse = {
				code: "Get products error",
				type: e.name,
				message: e.message,
			};

			res.status(500).send(errorResponseData);
		}
	}
}
