import SearchIcon from "../public/icons/search.svg";
import FeedIcon from "../public/icons/feed.svg";
import HomeIcon from "../public/icons/home.svg";
import Link from "next/link";

const Navbar = () => {
	return (
		<header className="fixed flex bg-gray-100 h-12 items-center justify-between w-full z-10">
			{/* Logo */}

			<Link href={"/"}>
				<h1 className="text-2xl font-medium italic ml-5">Sreality Archive</h1>
			</Link>
			{/* Search */}
			<div className="hidden sm:flex items-center bg-white rounded-xl px-2 space-x-1.5">
				<SearchIcon className="w-7 h-7" />
				<input
					type="text"
					className="sm:w-[15rem] md:w-[20rem] lg:w-[30rem] h-9 focus:outline-none"
				/>
			</div>

			{/* Navigation */}
			<nav className="mr-4">
				<ul className="flex space-x-1">
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<Link href={"/"}>
								<HomeIcon className="w-7 h-7" />
							</Link>
						</button>
					</li>
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<Link href={"/feed"}>
								<FeedIcon className="w-7 h-7" />{" "}
							</Link>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
