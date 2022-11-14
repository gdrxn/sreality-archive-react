import React from "react";

type Props = {};

const Loader = (props: Props) => {
	return (
		<div className="my-8 m-auto flex h-16 w-16 rounded-full bg-transparent border-2 border-transparent border-t-2 border-t-black border-r-black animate-spin-slow">
			<div className="m-auto flex h-10 w-10 rounded-full bg-transparent border-2 border-transparent border-b-2 border-b-black  animate-reverse-spin"></div>
		</div>
	);
};

export default Loader;
