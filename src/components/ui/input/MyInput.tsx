import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import classes from "./styles.module.css";

type TInputProps = {
	type?: HTMLInputTypeAttribute;
	onChange: ChangeEventHandler;
	placeholder?: string;
};

const MyInput = ({ type, onChange, placeholder }: TInputProps) => {
	return (
		<input
			onChange={onChange}
			type={type}
			className={classes.inp}
			placeholder={placeholder}
		/>
	);
};

export default MyInput;
