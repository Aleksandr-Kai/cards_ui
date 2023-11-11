import React, { useState } from "react";
import classes from "./styles.module.css";
import MyButton from "../ui/button/MyButton";
import classNames from "classnames";
import { signout } from "../../apitools.js";
import MyNav from "../ui/nav/MyNav";

const Header = ({ className, onLogout, toggleListsSidebar }) => {
	const logout = () => {
		signout();
		onLogout();
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
							// { id: "itemAbout", text: "About" },
						]}
					/>
					<span className={classes.username}>{localStorage.user}</span>
					<MyButton onClick={logout}>X</MyButton>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Header;
