import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkAuth } from "./store/actionCreators/auth";
import { Header } from "./components";
import {
	// Board
	Board,
	// Auth
	Auth,
	Registration,
	Login,
	Logout,
	Profile,
	// Adverticement
	Adverticement,
	Add,
	Update
} from "./page";
// style
import "./app.scss";

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<div className="app">
			<Header />
			<div className="app__body body">
				<div className="body__container container">
					<div className="body__row">
						<Routes>
							<Route
								path="/"
								element={<Navigate replace to="/board" />}
							/>
							<Route path="board" element={<Board />} />
							<Route path="profile" element={<Profile />} />
							<Route
								path="adverticement"
								element={<Adverticement />}>
								<Route path="add" element={<Add />} />
								<Route path="update/:id" element={<Update />} />
							</Route>
							<Route path="auth" element={<Auth />}>
								<Route
									path="registration"
									element={<Registration />}
								/>
								<Route path="login" element={<Login />} />
								<Route path="logout" element={<Logout />} />
							</Route>
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
