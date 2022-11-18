import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Form } from "../../../components";
// style
import "./logout.scss";
import { logout } from "../../../store/actionCreators/auth";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			await dispatch(logout());
			navigate("/auth/login");
		} catch (error) {
			console.log(error);
			navigate("/");
		}
	};

	return <Form btn="Logout" submit={onSubmit} />;
};

export default Logout;
