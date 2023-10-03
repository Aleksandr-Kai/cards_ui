import React, { useState } from "react";
import classes from "./styles.module.css";
import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import MessageBox from "../messagebox/MessageBox";
import { signin } from "../../apitools.js";

const AuthForm = ({ resolve, reject, ...props }) => {
	const [login, setLogin] = useState("");
	const [pass, setPass] = useState("");
	const [accessFail, setAccessFail] = useState(false);
	return (
		<div className={classes.container}>
			<div className={classes.authinput}>
				Login:{" "}
				<MyInput
					onChange={(event) => {
						setLogin(event.target.value);
						setAccessFail(false);
					}}
				/>
			</div>
			<div className={classes.authinput}>
				Password:{" "}
				<MyInput
					type={"password"}
					onChange={(event) => {
						setPass(event.target.value);
						setAccessFail(false);
					}}
				/>
			</div>
			{accessFail ? <p>Неверный логин или пароль</p> : <p></p>}
			<MyButton
				className={classes.btn}
				onClick={() => {
					signin(login, pass)
						.then(resolve)
						.catch((err) => {
							reject(err.message);
							setAccessFail(true);
						});
				}}
			>
				Войти
			</MyButton>
		</div>
	);
};

export default AuthForm;
