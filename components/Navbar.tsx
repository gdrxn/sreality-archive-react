import SearchIcon from "../public/icons/search.svg";
import ExitIcon from "../public/icons/exit.svg";
import SettingsIcon from "../public/icons/settings.svg";
import HomeIcon from "../public/icons/home.svg";

const Navbar = () => {
	return (
		<header className="flex bg-gray-100/80 h-14 items-center justify-between">
			{/* Logo */}
			<h1 className="text-xl font-medium italic ml-3">Sreality Archive</h1>

			{/* Search */}
			<div className="flex items-center bg-white rounded-xl px-2 space-x-1.5">
				<SearchIcon className="w-6 h-6" />
				<input type="text" className="w-72 py-2 focus:outline-none" />
			</div>

			{/* Navigation */}
			<nav className="mr-4">
				<ul className="flex space-x-1">
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<HomeIcon className="w-6 h-6" />
						</button>
					</li>
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<SettingsIcon className="w-6 h-6" />
						</button>
					</li>
					<li>
						<button className="hover:bg-gray-200 rounded-full p-1.5">
							<ExitIcon className="w-6 h-6" />
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
