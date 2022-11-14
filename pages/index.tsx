import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { IGetProductsResponse } from "../types";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

import { useRef } from "react";
import Navbar from "../components/Navbar";
import RealEstateCard from "../components/RealEstateCard";
import Loader from "../components/Loader";

export async function getServerSideProps() {
	const res = await axios.get<IGetProductsResponse>(
		`http://localhost:5173/api/products?limit=12&page=1`
	);

	// Pass data to the page via props
	return { props: { data: res.data } };
}

type Props = {
	data: IGetProductsResponse;
};

const Home: NextPage<Props> = ({ data }) => {
	const router = useRouter();

	const [sortType, setsortType] = useState("date-desc");
	const [products, setProducts] = useState(data.currentProducts);
	const productsLength = useRef(data.productsLength);

	const pageNumber = useRef(2);
	const [loading, setLoading] = useState(false);

	function fetchProduct() {
		axios
			.get<IGetProductsResponse>(
				`/api/products?limit=12&page=${pageNumber.current}`
			)
			.then((res) => {
				setProducts([...products, ...res.data.currentProducts]);
				productsLength.current = res.data.productsLength;
				setLoading(false);
				pageNumber.current++;
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	function sort(e: ChangeEvent<HTMLSelectElement>) {
		setsortType(e.currentTarget.value);
		router.push(`/?limit=12&sort=${e.currentTarget.value}`);
	}

	const handleScroll = async () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			setLoading(true);
		}
	};

	useEffect(() => {
		if (loading) {
			fetchProduct();
		}
	}, [loading]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
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
					className="self-end focus:outline-none  px-2 py-1.5 rounded-lg shadow-md border border-gray-100 mt-6 mr-4"
					value={sortType}
					onChange={sort}
				>
					<option value="date-asc">Date ascending</option>
					<option value="date-desc">Date descending</option>
					<option value="price-asc">Price ascending</option>
					<option value="price-desc">Price descending</option>
				</select>

				<ul className="mt-9 mx-auto flex flex-wrap gap-5 justify-center">
					{products.map((product) => (
						<RealEstateCard key={product._id} product={product} />
					))}
				</ul>
				{loading && <Loader />}
			</main>
		</div>
	);
};

export default Home;
