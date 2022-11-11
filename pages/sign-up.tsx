import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

type Props = {};

const SignUpPage = (props: Props) => {
	const router = useRouter();
	function login(e: FormEvent) {
		e.preventDefault();

		router.push("/");
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 to-fuchsia-600">
			<form
				onSubmit={login}
				className="bg-gray-50/95 flex flex-col items-center w-[17rem] h-[23rem] sm:w-[21rem] sm:h-[27rem] rounded-xl"
			>
				<h1 className="mt-5 sm:mt-9 text-2xl font-medium">Sign up</h1>
				<div className="mt-6 sm:mt-7 flex flex-col w-9/12">
					<label htmlFor="email" className="text-sm font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Type your email"
						className="bg-transparent text-gray-800 font-medium mt-1 pl-1 pb-1.5 border-b border-gray-500 focus:outline-none placeholder:text-sm placeholder:font-normal"
					/>
				</div>

				<div className="mt-3 flex flex-col w-9/12">
					<label htmlFor="password" className="text-sm font-medium">
						Password
					</label>
					<input
						id="password"
						type="password"
						placeholder="Type your password"
						className="bg-transparent text-gray-800 font-medium mt-1 pl-1 pb-1.5 border-b border-gray-500 focus:outline-none placeholder:text-sm placeholder:font-normal"
					/>
				</div>
				<div className="mt-3 flex flex-col w-9/12">
					<label htmlFor="password" className="text-sm font-medium">
						Confirm Password
					</label>
					<input
						id="confirm-password"
						type="password"
						placeholder="Confirm your password"
						className="bg-transparent text-gray-800 font-medium mt-1 pl-1 pb-1.5 border-b border-gray-500 focus:outline-none placeholder:text-sm placeholder:font-normal"
					/>
				</div>

				<button className="w-9/12 mt-10 h-9 font-medium text-white uppercase bg-gradient-to-r from-blue-400 to-fuchsia-600 rounded-full">
					Register
				</button>

				<Link href="/login" className="mt-4 text-sm font-medium text-gray-600">
					Already have an account?
				</Link>
			</form>
		</div>
	);
};

export default SignUpPage;
