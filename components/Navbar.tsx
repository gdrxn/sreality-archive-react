type Props = {};

const Navbar = (props: Props) => {
	return (
		<header className="flex bg-gray-100/80 h-12 items-center justify-between">
			{/* Logo */}
			<h1 className="text-xl font-medium italic ml-3">Sreality Archive</h1>

			{/* Search */}
			<input
				type="text"
				className="w-80 py-1.5 rounded-xl px-3.5 focus:outline-none"
			/>

			{/* Navigation */}
			<nav className="mr-3">
				<ul className="flex space-x-2">
					<li>a</li>
					<li>b</li>
					<li>c</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
