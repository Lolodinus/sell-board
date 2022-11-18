import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profilebar, List, Card, Pagination } from "../../components";
import {
	fetchUserAdverticement,
	fetchNextUserAdverticement
} from "../../store/actionCreators/userAdverticement";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
// style
import "./profile.scss";
// type
import { IAdverticement } from "../../interface/adverticement";

const Profile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		userAdverticements: adverticements,
		lastDoc,
		dataEmpty
	} = useAppSelector((state) => state.rootReducer.userAdverticement);
	const { uid, isLoading, isAuth } = useAppSelector(
		(state) => state.rootReducer.auth
	);
	// pagination
	const [currentPage, setCurrentPage] = useState<number | string>(1);
	const [content, setContent] = useState<IAdverticement[]>([]);
	const [totalPage, setTotalPage] = useState<number>(1);
	const pageLimit = 12;
	const fetchLimit = pageLimit * 3;

	useEffect(() => {
		if (!uid || adverticements.length > 0) return;
		dispatch(fetchUserAdverticement(uid, fetchLimit));
	}, [uid, adverticements]);

	useEffect(() => {
		if (adverticements.length === 0) return;
		const total = Math.ceil(adverticements.length / pageLimit);
		if (total === totalPage) return;
		setTotalPage(total);
	}, [adverticements]);

	useEffect(() => {
		if (adverticements.length === 0) return;
		if (typeof currentPage !== "number") return;
		if (currentPage === 1) {
			setContent(adverticements.slice(0, currentPage * pageLimit));
		} else {
			setContent(
				adverticements.slice(
					(currentPage - 1) * pageLimit,
					currentPage * pageLimit
				)
			);
		}
	}, [adverticements, currentPage]);

	useEffect(() => {
		if (!isLoading && !isAuth) {
			navigate("/auth/login");
		}
	}, [isLoading]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="profile">
			<div className="profile__left">
				<Profilebar />
			</div>
			<div className="profile__right">
				<div className="profile__list">
					{content.length !== 0 && (
						<>
							<List
								items={content}
								renderItem={(item) => {
									return (
										<Card
											item={item}
											attributes={{
												onClick: () =>
													navigate(
														`/adverticement/update/${item.id}`
													)
											}}
										/>
									);
								}}
							/>
						</>
					)}
				</div>
				{totalPage > 1 && (
					<div className="profile__pagination">
						<Pagination
							totalPage={totalPage}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							onClick={{
								lastBtn: () => {
									if (dataEmpty) return;
									dispatch(
										fetchNextUserAdverticement(
											uid,
											fetchLimit,
											lastDoc
										)
									);
								}
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
