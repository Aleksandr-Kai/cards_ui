import React from "react";
import classes from "./styles.module.css";

const DropDown = ({ id, name, words, ...props }) => {
	let index = 0;
	return (
		<div className={classes.dropdown} {...props}>
			<div className={classes.listName} id={id}>
				{name}
			</div>
			{words.length > 0 ? (
				<ul className={classes.listWords}>
					{words.map((word) => (
						<li key={Date.now() + name + word + index++}>{word}</li>
					))}
				</ul>
			) : (
				<div className={classes.listWords}>
					<p className={classes.textEmpty}>Empty list</p>
				</div>
			)}
		</div>
	);
};

export default DropDown;
