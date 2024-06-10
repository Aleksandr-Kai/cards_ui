import React, { useState } from "react";
import classes from "./styles.module.css";
import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import { signin, signup } from "../../apitools.js";

type TAuthFormProps = {
	resolve: () => void;
	reject: (data: unknown) => void;
	message: (text: string) => void;
};

const AuthForm = ({ resolve, reject, message }: TAuthFormProps) => {
	const [login, setLogin] = useState("");
	const [pass, setPass] = useState("");
	const [accessFail, setAccessFail] = useState(false);
	return (
		<div className={classes.container}>
			<div className={classes.authinput}>
				Login:{" "}
				<MyInput
					onChange={(event) => {
						setLogin((event.target as HTMLInputElement).value);
						setAccessFail(false);
					}}
					placeholder="Имя пользователя"
				/>
			</div>
			<div className={classes.authinput}>
				Password:{" "}
				<MyInput
					type={"password"}
					onChange={(event) => {
						setPass((event.target as HTMLInputElement).value);
						setAccessFail(false);
					}}
					placeholder="Пароль"
				/>
			</div>
			<div
				className={classes.signup}
				onClick={() => {
					signup(login, pass)
						.then((r) => {
							if (r.status) message(r.status);
							else message(r.error);
						})
						.catch((err) => {
							message(err.message);
							setAccessFail(true);
						});
				}}
			>
				New user
			</div>
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
				Singn in
			</MyButton>
			{accessFail && <p className={classes.fail}>Access denied</p>}
			{/* {accessFail && <p className={classes.fail}>Неверный логин или пароль</p>} */}
		</div>
	);
};

export default AuthForm;
