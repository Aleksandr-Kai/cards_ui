import React, { useState } from "react";
import classes from "./styles.module.css";
import MyButton from "../ui/button/MyButton";
import classNames from "classnames";
import { signout } from "../../apitools.js";
import MyNav from "../ui/nav/MyNav";

const Header = ({ className, onLogout, toggleListsSidebar }) => {
	const [userName, setUserName] = useState(localStorage.user);

	const logout = () => {
		signout();
		onLogout();
		setUserName("");
	};
	return (
		<div className={classNames(classes.container, className)}>
			<img src="read-book-icon.svg" />
			{Boolean(localStorage.token) ? (
				<>
					<MyNav
						items={[
							{
								id: "itemLists",
								text: "Word lists",
								click: toggleListsSidebar,
							},
							// { id: "itemActions", text: "Actions" },
							{ id: "itemAbout", text: "About" },
						]}
					/>
					<h1>{userName}</h1>
					<MyButton onClick={logout}>X</MyButton>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Header;
