import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { List, Card, Pagination, ImageField } from "../../components";
// style
import "./board.scss";
// type
import { IAdverticement } from "../../interface/adverticement";
import { ICard } from "../../interface/card";
import {
	fetchAllAdverticement,
	fetchNextAllAdverticement
} from "../../store/actionCreators/adverticement";

const Board = () => {
	const dispatch = useAppDispatch();
	const { adverticements, dataEmpty, lastDoc } = useAppSelector(
		(state) => state.rootReducer.adverticement
	);
	// pagination
	const [currentPage, setCurrentPage] = useState<number | string>(1);
	const [content, setContent] = useState<IAdverticement[]>([]);
	const [totalPage, setTotalPage] = useState<number>(1);
	const pageLimit = 12;
	const fetchLimit = pageLimit * 3;

	// useEffect(() => {
	// 	if (adverticements.length > 0) return;
	// 	dispatch(fetchAllAdverticement(fetchLimit));
	// }, [adverticements]);

	// useEffect(() => {
	// 	if (adverticements.length === 0) return;
	// 	const total = Math.ceil(adverticements.length / pageLimit);
	// 	if (total === totalPage) return;
	// 	setTotalPage(total);
	// }, [adverticements]);

	// useEffect(() => {
	// 	if (adverticements.length === 0) return;
	// 	if (typeof currentPage !== "number") return;
	// 	if (currentPage === 1) {
	// 		setContent(adverticements.slice(0, currentPage * pageLimit));
	// 	} else {
	// 		setContent(
	// 			adverticements.slice(
	// 				(currentPage - 1) * pageLimit,
	// 				currentPage * pageLimit
	// 			)
	// 		);
	// 	}
	// }, [adverticements, currentPage]);

	return (
		<div className="board">
			<div className="board__list">
				{/* {content.length !== 0 ? (
					<>
						<List
							items={content}
							renderItem={(item) => {
								return <Card item={item} />;
							}}
						/>
					</>
				) : (
					<div className="board__empty">Board is empty...</div>
				)} */}
			</div>
			{/* {totalPage > 1 && (
				<div className="board__pagination">
					<Pagination
						totalPage={totalPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						onClick={{
							lastBtn: () => {
								if (dataEmpty) return;
								dispatch(
									fetchNextAllAdverticement(
										fetchLimit,
										lastDoc
									)
								);
							}
						}}
					/>
				</div>
			)} */}
		</div>
	);
};

export default Board;
