import React, { useEffect, useState } from "react";
// style
import "./Pagination.scss";
// type
type PaginationProps = {
	totalPage: number;
	currentPage: number | string;
	setCurrentPage: React.Dispatch<React.SetStateAction<number | string>>;
	onClick?: {
		nextBtn?: () => any;
		prevBtn?: () => any;
		lastBtn?: () => any;
		firstBtn?: () => any;
	};
};

const Pagination = (props: PaginationProps) => {
	const { totalPage, currentPage, setCurrentPage, onClick } = props;
	const [arrayPages, setArrayPages] = useState<Array<number | string>>([]);
	const pages: number[] = [];
	for (let i = 0; i < totalPage; i++) {
		pages.push(i + 1);
	}

	useEffect(() => {
		let templateOfPages = [...arrayPages];
		const initDots = "...";
		const leftDots = "... ";
		const rightDots = " ...";

		if (currentPage === initDots) {
			setCurrentPage(arrayPages.length - 1);
		}
		if (currentPage === leftDots) {
			setCurrentPage((arrayPages[2] as number) - 1);
		}
		if (currentPage === rightDots) {
			setCurrentPage((arrayPages[arrayPages.length - 3] as number) + 1);
		}

		if (totalPage <= 7) {
			templateOfPages = pages;
		} else if (currentPage === 1) {
			const leftSide = [1, 2, 3];
			const rightSide = pages.slice(pages.length - 1);
			templateOfPages = [...leftSide, initDots, ...rightSide];
		} else if (
			typeof currentPage === "number" &&
			currentPage > 1 &&
			currentPage <= 4
		) {
			const leftSide = pages.slice(0, currentPage + 2);
			const rightSide = pages.slice(pages.length - 1);
			templateOfPages = [...leftSide, rightDots, ...rightSide];
		} else if (
			typeof currentPage === "number" &&
			currentPage > 4 &&
			currentPage < pages.length - 3
		) {
			const leftSide = pages.slice(0, 1);
			const centerSide = pages.slice(currentPage - 3, currentPage + 2);
			const rightSide = pages.slice(pages.length - 1);
			templateOfPages = [
				...leftSide,
				leftDots,
				...centerSide,
				rightDots,
				...rightSide
			];
		} else if (
			typeof currentPage === "number" &&
			currentPage >= pages.length - 3
		) {
			const leftSide = pages.slice(0, 1);
			const rightSide = pages.slice(currentPage - 3, pages.length);
			templateOfPages = [...leftSide, leftDots, ...rightSide];
		}
		setArrayPages(templateOfPages);
	}, [currentPage, totalPage]);

	const handlerNextPage = () => {
		if (totalPage === currentPage) return;
		setCurrentPage((prev) => (typeof prev === "number" ? prev + 1 : prev));
		if (onClick.nextBtn) onClick.nextBtn();
	};

	const handlerPrevPage = () => {
		if (currentPage === 1) return;
		setCurrentPage((prev) => (typeof prev === "number" ? prev - 1 : prev));
		if (onClick.prevBtn) onClick.prevBtn();
	};

	return (
		<ul className="pagination__list">
			<li
				className={
					currentPage !== 1
						? "pagination__item"
						: "pagination__item inactive"
				}
				onClick={handlerPrevPage}>
				{"<"}
			</li>
			{arrayPages.map((page, index) => {
				return (
					<li
						className={
							currentPage === page
								? "pagination__item action"
								: "pagination__item"
						}
						key={`page${index + 1}`}
						onClick={() => {
							if (currentPage === page) return;
							setCurrentPage(page);
							if (index === 0 && onClick.firstBtn)
								onClick.firstBtn();
							if (
								arrayPages.length === index + 1 &&
								onClick.lastBtn
							)
								onClick.lastBtn();
						}}>
						{page}
					</li>
				);
			})}
			<li
				className={
					totalPage !== currentPage
						? "pagination__item"
						: "pagination__item inactive"
				}
				onClick={handlerNextPage}>
				{">"}
			</li>
		</ul>
	);
};

export default Pagination;
