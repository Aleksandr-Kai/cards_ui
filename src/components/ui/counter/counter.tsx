import React from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

type TCounterProps = {
	className?: string,
	value: number,
};

const Counter = ({ className, value }: TCounterProps) => {
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
