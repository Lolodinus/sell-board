import React, { HTMLAttributes } from "react";
import defaultImage from "./default.png";
// style
import "./card.scss";
// type
import { IAdverticement } from "../../interface/adverticement";

type ICardProps = {
	item: IAdverticement;
	attributes?: HTMLAttributes<HTMLElement>;
};

const Card = (props: ICardProps) => {
	const {
		item: { title, description, price, imageURL },
		attributes
	} = props;
	return (
		<div className="card" {...attributes}>
			<div className="card__wrapper">
				<div
					className={
						imageURL ? "card__previe" : "card__previe _default"
					}>
					<img src={imageURL ? imageURL : defaultImage} alt={title} />
				</div>
				<div className="card__info">
					<div className="card__title">{title}</div>
					<div className="card__description">{description}</div>
					<div className="card__price">
						Price
						<span className="card__price-value">{price}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
