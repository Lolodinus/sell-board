import React, { useEffect } from "react";
// style
import "./ImageField.scss";
// types
import { getId } from "../../utils/random";

export type ImageFile = {
	id: string;
	value: File;
};

export type ImagePreview = {
	id: string;
	value: string;
	default?: boolean;
};

type Field<T> = {
	value: T;
	setValue: (T) => any;
	setError?: (error: string | undefined) => any;
};

type ImgFieldProps = {
	imageFile: Field<ImageFile[]>;
	preview: Field<ImagePreview[]>;
	count: 5;
};

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const ImageField = (prop: ImgFieldProps) => {
	const { imageFile, preview, count } = prop;

	// File
	const imageFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// check image count
		if (
			imageFile.value.length === count ||
			preview.value.length === count
		) {
			imageFile.setError(`Max image quantity: ${count}`);
			return;
		}

		// image validation
		const { files } = event.target;
		const validImageFiles = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file.type.match(imageTypeRegex)) {
				validImageFiles.push(file);
			} else {
				imageFile.setError(
					`Invalid image extention .${file.name.split(".")[1]}`
				);
			}
		}

		// set valid files
		if (validImageFiles.length) {
			let remainder = count - preview.value.length;
			imageFile.setValue([
				...imageFile.value,
				...validImageFiles.slice(0, remainder).map((file) => {
					return {
						id: getId(),
						value: file
					};
				})
			]);
		}

		// imageFile.setError("");
	};

	const handlerRemoveImage = (id) => {
		const indexPreview = preview.value.findIndex((item) => item.id === id);
		if (indexPreview !== -1) {
			preview.setValue([
				...preview.value.slice(0, indexPreview),
				...preview.value.slice(indexPreview + 1)
			]);
		}
		const indexFile = imageFile.value.findIndex((file) => file.id === id);
		if (indexFile !== -1) {
			imageFile.setValue([
				...imageFile.value.slice(0, indexFile),
				...imageFile.value.slice(indexFile + 1)
			]);
		}
	};

	// Set Preview
	useEffect(() => {
		const images = [];
		const fileReaders = [];
		let isCancel = false;

		if (imageFile.value.length) {
			imageFile.value.forEach((file) => {
				const fileReader = new FileReader();
				fileReaders.push(fileReader);
				fileReader.onload = (e) => {
					const { result } = e.target;
					if (result) {
						images.push({
							id: file.id,
							value: result
						});
					}
					if (images.length === imageFile.value.length && !isCancel) {
						const defaultPrevie = preview.value.filter(
							(item) => item.default
						);
						preview.setValue([...defaultPrevie, ...images]);
					}
				};
				fileReader.readAsDataURL(file.value);
			});
		}
	}, [imageFile.value]);

	return (
		<div className="image-input">
			<div className="image-input__wrapper">
				<div className="image-input__previe">
					{preview.value.length > 0 &&
						preview.value.map((preview, index) => {
							return (
								<img
									className="image-input__img"
									src={preview.value}
									key={preview.id}
									alt=""
									onClick={() => {
										handlerRemoveImage(preview.id);
									}}
								/>
							);
						})}
				</div>
				<label className="image-input__btn">
					Upload
					<input
						className="image-input__input"
						type="file"
						multiple
						onChange={imageFileOnChange}
					/>
				</label>
			</div>
		</div>
	);
};

export default ImageField;
