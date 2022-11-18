import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// style
import "./auth.scss";

const Auth = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("Authentication");
	useEffect(() => {
		if (!pathname) return;
		switch (pathname) {
			case "/auth/login":
				setTitle("Login");
				break;
			case "/auth/registration":
				setTitle("Login");
				break;
			default:
				setTitle("Authentication");
				break;
		}
	}, [pathname]);
	return (
		<div className="auth">
			<div className="auth__wrapper">
				<h1 className="auth__title">{title}</h1>
				<Outlet />
				<button
					className="auth__back"
					onClick={() => {
						navigate(-1);
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512">
						<path d="M177.5 98c-8.8-3.8-19-2-26 4.6l-144 136C2.7 243.1 0 249.4 0 256s2.7 12.9 7.5 17.4l144 136c7 6.6 17.2 8.4 26 4.6s14.5-12.5 14.5-22l0-88 288 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-288 0 0-88c0-9.6-5.7-18.2-14.5-22z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Auth;
