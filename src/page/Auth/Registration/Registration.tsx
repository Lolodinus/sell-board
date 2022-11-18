import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { firebaseAuth as auth } from "../../../services/firebaseAuth";
import { Form } from "../../../components";
// style
import "./registration.scss";
// type
type Inputs = {
	login: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Registration = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { login, email, password } = data;
		try {
			await auth.registration({
				login,
				email,
				password
			});
			navigate("/auth/login");
		} catch (error) {
			setError("login", { type: "server", message: error.message });
		}
	};
	return (
		<>
			<Form
				inputs={[
					{
						label: "Login",
						attributes: {
							type: "text",
							placeholder: "Input your login...",
							...register("login", {
								required: "Required field",
								maxLength: {
									value: 15,
									message: "Max length 15"
								},
								minLength: { value: 4, message: "Min length 4" }
							})
						},
						error: errors.login?.message
							? errors.login.message
							: undefined
					},
					{
						label: "Email",
						attributes: {
							type: "email",
							placeholder: "example@example.com...",
							...register("email", {
								required: "Required field",
								maxLength: {
									value: 25,
									message: "Max length 25"
								},
								minLength: { value: 5, message: "Min length 5" }
							})
						},
						error: errors.email?.message
							? errors.email.message
							: undefined
					},
					{
						label: "Password",
						attributes: {
							type: "password",
							placeholder: "Input your password...",
							...register("password", {
								required: "Required field",
								maxLength: {
									value: 50,
									message: "Max length 50"
								},
								minLength: { value: 8, message: "Min length 8" }
							})
						},
						error: errors.password?.message
							? errors.password.message
							: undefined
					},
					{
						label: "Confirm password",
						attributes: {
							type: "password",
							placeholder: "Input your password...",
							...register("confirmPassword", {
								required: "Required field",
								maxLength: {
									value: 50,
									message: "Max length 50"
								},
								minLength: {
									value: 8,
									message: "Min length 8"
								},
								validate: (value) =>
									value === getValues("password") ||
									"Password does not match"
							})
						},
						error: errors.confirmPassword?.message
							? errors.confirmPassword.message
							: undefined
					}
				]}
				btn="Registration"
				submit={handleSubmit(onSubmit)}
			/>
		</>
	);
};

export default Registration;
