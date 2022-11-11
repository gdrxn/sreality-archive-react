import axios, { type AxiosResponse, AxiosError } from "axios";
import type { IErrorResponse } from "./types";

const axiosInstance = axios.create({
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError<IErrorResponse>) => {
		if (error.response?.status === 401) {
			if (
				error.response.data.message === "Session does not exist" ||
				error.response.data.message === "Password has been changed"
			) {
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
