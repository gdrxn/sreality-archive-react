import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Navbar from "../../components/Navbar";
import { IGetProductResponse, IRealEstate } from "../../types";
type Props = {
	query: ParsedUrlQuery;
};

const Product: NextPage<Props> = (props) => {
	const router = useRouter();
	const [product, setproduct] = useState(null as null | IRealEstate);

	function fetchProduct() {
		axios
			.get<IGetProductResponse>(`/api/product/${props.query.id}`)
			.then((res) => {
				setproduct(res.data.result);
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	useEffect(() => {
		fetchProduct();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />

			<main className="flex flex-col flex-1 px-20">
				<Swiper
					// install Swiper modules
					modules={[Navigation, Pagination, A11y]}
					slidesPerView={1}
					spaceBetween={0}
					navigation={true}
					pagination={{ clickable: true }}
					className="flex w-[960px] h-[640px] mt-9"
				>
					{product?.images.map((image) => (
						<SwiperSlide key={image}>
							<Image
								src={image as string}
								alt={"Real estate photo"}
								layout="fill"
							/>
						</SwiperSlide>
					))}
				</Swiper>

				<h1 className="mt-10 text-2xl">{product?.name}</h1>
				<h2 className="mt-1 text-xl">{product?.location}</h2>
				<p className="mt-6 mb-10">{product?.description}</p>
			</main>
		</div>
	);
};

Product.getInitialProps = async (req) => {
	const query = req.query;

	return { query };
};

export default Product;
