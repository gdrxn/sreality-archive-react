import Link from "next/link";
import { useRouter } from "next/router";
import axiosInstance from "../axiosInstance";
import type { AxiosError } from "axios";
import type { ILoginRequest, ISessionUser } from "../types";
import { FormEvent, useRef } from "react";

type Props = {};

const LoginPage = (props: Props) => {
	const router = useRouter();

	const email = useRef("");
	const password = useRef("");

	function login(e: FormEvent) {
		e.preventDefault();

		const requestData: ILoginRequest = {
			email: email.current,
			password: password.current,
		};

		axiosInstance
			.post<ISessionUser>("/api/auth/login", requestData, {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			})
			.then((res) => {
				router.push("/");
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 to-fuchsia-600">
			<form
				onSubmit={login}
				className="bg-gray-50/95 flex flex-col items-center w-[17rem] h-[23rem] sm:w-[21rem] sm:h-[24.5rem] rounded-xl"
			>
				<h1 className="mt-5 sm:mt-9 text-2xl font-medium">Login</h1>
				<div className="mt-6 sm:mt-7 flex flex-col w-9/12">
					<label htmlFor="email" className="text-sm font-medium">
						Email
					</label>
					<input
						onChange={(e) => (email.current = e.currentTarget.value)}
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
						onChange={(e) => (password.current = e.currentTarget.value)}
						id="password"
						type="password"
						placeholder="Type your password"
						className="bg-transparent text-gray-800 font-medium mt-1 pl-1 pb-1.5 border-b border-gray-500 focus:outline-none placeholder:text-sm placeholder:font-normal"
					/>
				</div>
				<Link
					href="/reset-password"
					className="self-end mr-10 mt-1.5 text-sm font-medium text-gray-600"
				>
					Forgot password?
				</Link>

				<button className="w-9/12 mt-10 h-9 font-medium text-white uppercase bg-gradient-to-r from-blue-400 to-fuchsia-600 rounded-full">
					Login
				</button>

				<Link
					href="/sign-up"
					className="mt-4 text-sm font-medium text-gray-600"
				>
					or Sign up
				</Link>
			</form>
		</div>
	);
};

export default LoginPage;
