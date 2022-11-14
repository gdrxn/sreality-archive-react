import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { IGetProductsResponse, IRealEstate } from "../types";
import axios, { AxiosError } from "axios";

import { useRef } from "react";
import Navbar from "../components/Navbar";
import RealEstateCard from "../components/RealEstateCard";

const Home: NextPage = () => {
	const [sortType, setsortType] = useState("date-desc");
	const [products, setProducts] = useState([] as IRealEstate[]);
	const productsLength = useRef(0);
	const pageNumber = useRef(1);

	function fetchProduct() {
		axios
			.get<IGetProductsResponse>(
				`/api/products?limit=12&page=${pageNumber.current}`
			)
			.then((res) => {
				setProducts([...products, ...res.data.currentProducts]);
				productsLength.current = res.data.productsLength;
				pageNumber.current++;
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	useEffect(() => {
		fetchProduct();
	}, []);

	return (
		<div className="flex flex-col">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />

			<main className="flex flex-col">
				<select
					className="self-end focus:outline-none text-lg px-2 py-1.5 rounded-lg shadow-md border border-gray-100 mt-6 mr-4"
					value={sortType}
					onChange={(e) => setsortType(e.target.value)}
				>
					<option value="date-desc">Date descending</option>
					<option value="date-asc">Date ascending</option>
					<option value="date-desc">Date descending</option>
					<option value="price-asc">Price ascending</option>
					<option value="price-desc">Price descending</option>
				</select>

				<ul className="mt-9 mb-9 mx-auto flex flex-wrap gap-5 justify-center">
					{products.map((product) => (
						<RealEstateCard key={product._id} product={product} />
					))}
				</ul>
			</main>
		</div>
	);
};

export default Home;
