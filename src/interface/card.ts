export interface ICard {
	readonly id: string;
	title: string;
	description?: string;
	price: number;
	imgURL?: string;
}
