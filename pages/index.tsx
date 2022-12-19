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
import Miniloader from "../components/Miniloader";
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
	const [pageLoading, setpageLoading] = useState(true);
	const [loading, setLoading] = useState(false);
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
				setpageLoading(false);
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
		<div className="flex flex-col min-h-screen">
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />

			<main className="mt-11 flex flex-col flex-1 items-center">
				{pageLoading ? (
					<Loader />
				) : (
					<div className="flex flex-col items-center">
						<select
							className="xl:self-end mt-7 px-5 py-1.5 cursor-pointer shadow-md rounded-xl border border-gray-100 focus:outline-none font-medium"
							value={sortType}
							onChange={sort}
						>
							<option value="date-desc">Newest listings</option>
							<option value="date-asc">Oldest listings</option>
							<option value="price-asc">Lowest price</option>
							<option value="price-desc">Highest price</option>
						</select>

						<ul className="mt-7 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
							{products.map((product) => (
								<RealEstateCard key={product._id} product={product} />
							))}
						</ul>
						{loading && <Miniloader />}
					</div>
				)}
			</main>
		</div>
	);
};

Home.getInitialProps = async (req) => {
	const query = req.query;

	return { query };
};

export default Home;
