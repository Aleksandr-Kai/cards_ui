import React, { useState } from "react";
import classes from "./styles.module.css";
import MyButton from "../ui/button/MyButton";
import AuthForm from "../authform/AuthForm";
import classNames from "classnames";
import { signin, signout } from "../../apitools.js";

const Header = ({ className, onAuth }) => {
	const [userName, setUserName] = useState("");

	const logout = () => {
		signout();
		onAuth(false);
		setUserName("");
	};
	const login = (name, password) => {
		signin(name, password)
			.then(() => onAuth(true))
			.then(() => setUserName(name));
	};
	return (
		<div className={classNames(classes.container, className)}>
			{Boolean(localStorage.token) ? (
				<>
					<MyButton onClick={logout}>Выйти</MyButton>
					<h3>{userName}</h3>
				</>
			) : (
				<AuthForm confirm={login} />
			)}
		</div>
	);
};

export default Header;
