import React from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Counter = ({ className, value, ...props }) => {
	return (
		<div className={classNames(className, classes.counter)}>
			{value > 0 ? (
				<h2>
					{value} card{value === 1 ? "" : "s"}
				</h2>
			) : (
				<></>
			)}
		</div>
	);
};

export default Counter;
