import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import userAdverticementSlice from "../../../store/reducers/userAdverticement";
import Adverticement from "../../../services/adverticement";
import { useTitle } from "../Adverticement";
import { Form, ImageField } from "../../../components";
// type// type
import {
	ImageFile,
	ImagePreview
} from "../../../components/ImageField/ImageField";

type Inputs = {
	title: string;
	description: string;
	price: number;
	uid: string;
};

const Add = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { uid, isLoading, isAuth } = useAppSelector(
		(state) => state.rootReducer.auth
	);
	const { setTitle } = useTitle();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue
	} = useForm<Inputs>();

	const [imageFile, setImageFile] = useState<ImageFile[]>([]);
	const [preview, setPreview] = useState<ImagePreview[]>([]);
	const [imageError, setImageError] = useState<string | undefined>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { title, description, price, uid } = data;
		const time = Date.now();
		try {
			await Adverticement.create({
				uid,
				title,
				description,
				price,
				imageFile: imageFile.map((file) => file.value),
				time
			});
			dispatch(userAdverticementSlice.actions.ResetUserAdverticement);
			navigate("/profile");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setTitle("Add");
	}, []);

	useEffect(() => {
		if (!isLoading && !isAuth) {
			navigate("/auth/login");
		}
	}, [isLoading]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<Form
			btn={"Add"}
			inputs={[
				{
					label: "Title",
					attributes: {
						type: "text",
						...register("title", {
							required: "Field required",
							maxLength: { value: 50, message: "Max length 50" }
						})
					},
					error: errors.title?.message
				},
				{
					label: "Description",
					attributes: {
						type: "text",
						...register("description", {
							required: "Field required",
							maxLength: { value: 250, message: "Max length 250" }
						})
					},
					error: errors.description?.message
				},
				{
					label: "Price",
					attributes: {
						type: "number",
						...register("price", {
							required: "Field required"
						})
					},
					error: errors.price?.message
				},
				{
					attributes: {
						type: "hidden",
						value: uid,
						...register("uid")
					}
				}
			]}
			customInputs={[
				{
					label: "Image",
					element: (
						<ImageField
							imageFile={{
								setValue: (files: ImageFile[]) => {
									setImageFile(files);
								},
								setError: (error: string) => {
									setImageError(error);
								},
								value: imageFile
							}}
							preview={{
								value: preview,
								setValue: (value: ImagePreview[]) => {
									setPreview(value);
								}
							}}
							count={5}
						/>
					),
					error: imageError
				}
			]}
			submit={handleSubmit(onSubmit)}
		/>
	);
};

export default Add;
