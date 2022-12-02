import SearchIcon from "../public/icons/search.svg";
import ExitIcon from "../public/icons/exit.svg";
import SettingsIcon from "../public/icons/settings.svg";
import HomeIcon from "../public/icons/home.svg";
import Link from "next/link";

const Navbar = () => {
	return (
		<header className="flex bg-gray-100/70 h-14 items-center justify-between">
			{/* Logo */}

			<Link href={"/"}>
				<h1 className="text-2xl font-medium italic ml-3">Sreality Archive</h1>
			</Link>
			{/* Search */}
			<div className="hidden sm:flex items-center bg-white rounded-xl px-2 space-x-1.5">
				<SearchIcon className="w-7 h-7" />
				<input
					type="text"
					className="sm:w-[15rem] md:w-[20rem] lg:w-[30rem] h-10 focus:outline-none"
				/>
			</div>

			{/* Navigation */}
			<nav className="mr-4">
				<ul className="flex space-x-1">
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<HomeIcon className="w-7 h-7" />
						</button>
					</li>
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<SettingsIcon className="w-7 h-7" />
						</button>
					</li>
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<ExitIcon className="w-7 h-7" />
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
