import React, { useState } from "react";
import classes from "./styles.module.css";

const MyNav = ({ items }) => {
	return (
		<ul className={classes.menu}>
			{items.map((item) => {
				return (
					<li key={item.id} id={item.id} onClick={item.click}>
						{item.text}
					</li>
				);
			})}
		</ul>
	);
};

export default MyNav;
