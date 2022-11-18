import React, { InputHTMLAttributes } from "react";
// style
import "./form.scss";
// type
interface IInput {
	label?: string;
	attributes: InputHTMLAttributes<HTMLInputElement>;
	error?: string;
}

type ICustomInput = {
	label?: string;
	element: JSX.Element;
	error?: string;
};

type FormProps = {
	inputs?: IInput[];
	customInputs?: ICustomInput[];
	btn: string | JSX.Element;
	submit: (event: React.SyntheticEvent<HTMLFormElement>) => any;
};

const Form = (props: FormProps) => {
	const { inputs, btn, submit, customInputs } = props;

	return (
		<form className="form" onSubmit={submit}>
			{inputs &&
				inputs.map((input, index) => {
					return (
						<label
							className={
								input.attributes.type !== "hidden"
									? "form__label"
									: "form__label _hidden"
							}
							key={`${input.label} ${index}`}>
							<span className="form__label-text">
								{input.label}
							</span>
							{input.error && (
								<div className="form__error">{input.error}</div>
							)}
							<input
								className="form__input"
								{...input.attributes}
							/>
						</label>
					);
				})}
			{customInputs &&
				customInputs.map((input, index) => {
					return (
						<div
							className="form__label _custom"
							key={`${input.label} ${index}`}>
							<span className="form__label-text">
								{input.label}
							</span>
							{input.error && (
								<div className="form__error">{input.error}</div>
							)}
							{input.element}
						</div>
					);
				})}
			<button className="form__btn" type="submit">
				{btn}
			</button>
		</form>
	);
};

export default Form;
