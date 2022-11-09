import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Navbar from "../components/Navbar";

const Home: NextPage = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />

			<main>
				<select name="">
					<option value=""></option>
				</select>

				<section>{/* cards */}</section>
			</main>
		</div>
	);
};

export default Home;
