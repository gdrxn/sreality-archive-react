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

export interface ISearchRequest {
	page: number;
	limit: number;
	searchTerm: string;
}

export interface IGetProductsRequest {
	page: number;
	limit: number;
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
	result: IRealEstate;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IResponse {
	success: boolean;
}

export interface IRegisterRequest {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
}

export interface ISessionUser {
	email: string;
	firstName: string;
	lastName: string;
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
