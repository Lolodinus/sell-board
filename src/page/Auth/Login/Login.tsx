import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { login } from "../../../store/actionCreators/auth";
import { Form } from "../../../components";
// style
import "./login.scss";

type Inputs = {
	email: string;
	password: string;
};

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const { email, password } = data;
			await dispatch(
				login({
					email,
					password
				})
			);
			navigate("/");
		} catch (error) {
			setError("email", { type: "server", message: error.message });
		}
	};

	return (
		<>
			<Form
				inputs={[
					{
						label: "Email",
						error: errors.email?.message,
						attributes: {
							type: "text",
							placeholder: "example@example.com",
							...register("email", {
								required: "Required field",
								maxLength: {
									value: 50,
									message: "Max length 50"
								},
								minLength: { value: 4, message: "Min length 4" }
							})
						}
					},
					{
						label: "Password",
						error: errors.password?.message,
						attributes: {
							placeholder: "Input your password...",
							type: "password",
							...register("password", {
								required: "Required field",
								maxLength: {
									value: 50,
									message: "Max length 50"
								},
								minLength: { value: 8, message: "Min length 8" }
							})
						}
					}
				]}
				btn="Login"
				submit={handleSubmit(onSubmit)}
			/>
			<hr className="login__line" />
			<Link className="login__link" to="/">
				Fogot password ?
			</Link>
			<Link className="login__btn" to="/auth/registration">
				Registration
			</Link>
		</>
	);
};

export default Login;
