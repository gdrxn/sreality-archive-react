import React from "react";

type Props = {};

const Loader = (props: Props) => {
	return (
		<div className="flex flex-1">
			<div className="self-center mb-40 my-8 m-auto flex h-40 w-40 rounded-full bg-transparent border-2 border-transparent border-t-2 border-t-black border-r-black animate-spin-slow">
				<div className="m-auto flex h-28 w-28 rounded-full bg-transparent border-2 border-transparent border-b-2 border-b-black  animate-reverse-spin"></div>
			</div>
		</div>
	);
};

export default Loader;
