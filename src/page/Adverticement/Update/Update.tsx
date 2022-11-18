import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import userAdverticementSlice from "../../../store/reducers/userAdverticement";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { firebaseDB as db } from "../../../services/firebaseDB";
import Adverticement from "../../../services/adverticement";
import { isObject } from "./../../../utils/isObject";
import { getId } from "../../../utils/random";
import { useTitle } from "../Adverticement";
import { Form, ImageField } from "../../../components";
// type
import { IAdverticement } from "../../../interface/adverticement";
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

const Update = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { setTitle } = useTitle();
	const [item, setItem] = useState<IAdverticement>();
	const [imageFile, setImageFile] = useState<ImageFile[]>([]);
	const [preview, setPreview] = useState<ImagePreview[]>([]);
	const [imageError, setImageError] = useState<string | undefined>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<Inputs>({
		defaultValues: {
			title: "",
			description: "",
			uid: ""
		}
	});

	useEffect(() => {
		setTitle("Update");
		if (!id) return;
		db.getDocById("advertisement", id)
			.then((data) => {
				if (
					!isObject<IAdverticement>(data, [
						"id",
						"title",
						"description",
						"price",
						"uid"
					])
				) {
					return;
				}
				setItem(data);
			})
			.catch((error) => console.log(error));
	}, []);

	// set default value
	useEffect(() => {
		if (!item) return;
		setValue("title", item.title);
		setValue("description", item.description);
		setValue("price", item.price);
		setValue("uid", item.uid);
		if (item.imageURL) {
			setPreview([
				...item.imageURL.map((image) => {
					return {
						id: getId(),
						value: image,
						default: true
					};
				})
			]);
		}
	}, [item]);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const { title, description, price, uid } = data;
			const time = Date.now();
			await Adverticement.update({
				id: item.id,
				title,
				description,
				price,
				uid,
				image: {
					beforeImageURL: item.imageURL,
					afterImageURL: preview.map((item) => item.value),
					newImageFile: imageFile.map((file) => file.value)
				},
				time
			});
			dispatch(userAdverticementSlice.actions.ResetUserAdverticement());
			navigate("/profile");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form
			btn={"Update"}
			inputs={[
				{
					label: "Title",
					attributes: {
						type: "text",
						...register("title", {
							required: "Field required",
							maxLength: {
								value: 50,
								message: "Max length 50"
							}
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
							maxLength: {
								value: 250,
								message: "Max length 250"
							}
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
						value: item?.uid,
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

export default Update;
