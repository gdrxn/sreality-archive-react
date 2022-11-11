export type HouseOrApartment = "House" | "Apartment";

export interface IRealEstate {
	_id: string;
	name: string;
	location: string;
	url: string;
	price: number;
	priceHistory: number[];
	description: string;
	parameters: string;
	images: string[];
	type: HouseOrApartment;
}

export interface IGetProductsRequest {
	page?: number;
	limit?: number;
	term?: string;
	min?: number;
	max?: number;
	type?: HouseOrApartment;
	sort?: string;
}

export interface IGetProductsRequest {
	page?: number;
	limit?: number;
	term?: string;
	min?: number;
	max?: number;
	type?: HouseOrApartment;
}

export interface IGetProductRequest {
	id?: string;
}

export interface IGetProductsResponse {
	currentProducts: IRealEstate[];
	productsLength: number;
}
export interface IErrorResponse {
	code: string;
	message: string;
	type?: string;
}

export interface IGetProductResponse {
	result: IRealEstate | null;
}

export interface IErrorResponse {
	code: string;
	message: string;
	type?: string;
}

export interface IUser {
	email: string;
	hash: string;
	firstName: string;
	lastName: string;
	notifications: INotifications[];
}

export interface INotifications {
	location: string;
	type: HouseOrApartment;
	priceMin: number;
	priceMax: number;
	discordWebhook: string;
}

export interface IGetNotificationsResponse {
	notifications: INotifications[];
}

export interface IRegisterRequest {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IResponse {
	success: boolean;
}

export interface ISessionUser {
	email: string;
	firstName: string;
	lastName: string;
}
