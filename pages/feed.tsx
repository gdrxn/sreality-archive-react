import axios, { AxiosError } from "axios";
import { ILatestListings } from "../types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const feed = () => {
	const [latestFeed, setlatestFeed] = useState(null as null | ILatestListings);

	function fetchFeed() {
		axios
			.get<ILatestListings>(`${process.env.NEXT_PUBLIC_MONITOR_API}/feed`)
			.then((res) => {
				setlatestFeed(res.data);
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	useEffect(() => {
		fetchFeed();
	}, []);

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="mt-11 flex h-[93%] divide-x">
				<section className="w-1/2 h-full flex flex-col">
					<h2 className="text-xl mt-6 ml-4 self-center">New listings</h2>
					{latestFeed?.newListings.length ? (
						<ul className=" mt-8 divide-y flex flex-col overflow-y-auto flex-1">
							{latestFeed?.newListings.map((newListing) => (
								<li className="flex w-full">
									<Link
										href={`product/${newListing._id}`}
										className="flex w-full py-4 justify-between px-36 items-center"
									>
										<div className="space-y-1 flex flex-col">
											<span className="font-medium">{newListing.name}</span>
											<span className="font-medium">{newListing.location}</span>
											<span className="font-medium">{`${newListing.price?.toLocaleString(
												"cs-CZ"
											)} Kč`}</span>
										</div>

										<Image
											className="w-44"
											src={newListing.images[0]}
											alt={"Real estate photo"}
											height={200}
											width={200}
										/>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<span className="mt-10 self-center">No new listings...</span>
					)}
				</section>

				<section className="w-1/2 h-full flex flex-col">
					<h2 className="text-xl mt-6 ml-4 self-center">
						Recently updated listings
					</h2>

					{latestFeed?.updatedListings.length ? (
						<ul className=" mt-8 divide-y flex flex-col overflow-y-auto flex-1">
							{latestFeed.updatedListings.map((updatedListing) => (
								<li className="flex w-full">
									<Link
										href={`product/${updatedListing._id}`}
										className="flex w-full py-4 justify-between px-36 items-center"
									>
										<div className="space-y-1 flex flex-col">
											<span className="font-medium">{updatedListing.name}</span>
											<span className="font-medium">
												{updatedListing.location}
											</span>
											<span className="pt-3 font-medium">{`Původní cena: ${updatedListing.priceHistory[
												updatedListing.priceHistory.length - 2
											]?.toLocaleString("cs-CZ")} Kč`}</span>
											<span className="font-medium">{`Nová cena: ${updatedListing.price?.toLocaleString(
												"cs-CZ"
											)} Kč`}</span>
										</div>

										<Image
											className="w-44"
											src={updatedListing.images[0]}
											alt={"Real estate photo"}
											height={200}
											width={200}
										/>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<span className="self-center mt-10">
							No recently updated listings...
						</span>
					)}
				</section>
			</main>
		</div>
	);
};

export default feed;
