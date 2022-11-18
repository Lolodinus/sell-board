import React from "react";
// style
import "./list.scss";
// type

type ListProps<T> = {
	items: Array<T & { id: string }>;
	renderItem: (item: T) => React.ReactNode;
};

export default function List<T>(props: ListProps<T>) {
	const { items, renderItem } = props;
	return (
		<ul className="list">
			{items.map((item) => {
				return (
					<li className="list__item" key={item.id}>
						{renderItem(item)}
					</li>
				);
			})}
		</ul>
	);
}
