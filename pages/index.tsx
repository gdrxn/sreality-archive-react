import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { IGetProductsResponse, IRealEstate } from "../types";
import axios, { AxiosError } from "axios";

import Navbar from "../components/Navbar";
import RealEstateCard from "../components/RealEstateCard";

const Home: NextPage = () => {
	const [sortType, setsortType] = useState("date-desc");
	const [products, setProducts] = useState([] as IRealEstate[]);

	useEffect(() => {
		axios
			.get<IGetProductsResponse>(`/api/products`)
			.then((res) => {
				setProducts(res.data.currentProducts);
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="flex min-h-screen flex-col">
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

				<section className="mt-10 px-5">
					<ul className="grid grid-cols-3 gap-5">
						{products.map((product) => (
							<RealEstateCard key={product._id} product={product} />
						))}
					</ul>
				</section>
			</main>
		</div>
	);
};

export default Home;
