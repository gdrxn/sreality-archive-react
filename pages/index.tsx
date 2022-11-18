import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { IGetProductsResponse, IRealEstate } from "../types";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

import { useRef } from "react";
import Navbar from "../components/Navbar";
import RealEstateCard from "../components/RealEstateCard";
import Loader from "../components/Loader";
import { ParsedUrlQuery } from "querystring";

type Props = {
	query: ParsedUrlQuery;
};
const Home: NextPage<Props> = ({ query }) => {
	const router = useRouter();

	const [sortType, setsortType] = useState(router.query.sort || "date-desc");
	const [products, setProducts] = useState([] as IRealEstate[]);
	const productsLength = useRef(0);

	const pageNumber = useRef(1);
	const [loading, setLoading] = useState(true);
	const isFirstRender = useRef(true);

	const limit = useRef(router.query.limit || 12);

	function initFetchProducts() {
		let queryString = "?";

		Object.keys(query).map((key) => {
			queryString += `${key}=${query[key]}&`;
		});

		axios
			.get<IGetProductsResponse>("/api/products" + queryString)
			.then((res) => {
				setProducts(res.data.currentProducts);
				productsLength.current = res.data.productsLength;
				setLoading(false);
				pageNumber.current++;
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	function fetchProduct() {
		const query = router.query;
		let queryString = "?";

		Object.keys(query).map((key) => {
			queryString += `${key}=${query[key]}&`;
		});

		axios
			.get<IGetProductsResponse>(
				`/api/products` + queryString + `page=${pageNumber.current}`
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
		location.href = `?sort=${e.currentTarget.value}`;

		setsortType(e.currentTarget.value);
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
		if (pageNumber.current === 1) return;
		if (loading) {
			fetchProduct();
		}
	}, [loading]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		initFetchProducts();

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

Home.getInitialProps = async (req) => {
	const query = req.query;

	return { query };
};

export default Home;
