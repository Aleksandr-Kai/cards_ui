import classNames from "classnames";
import classes from "./cell.module.css";
import { useEffect, useState } from "react";

function CellEx({ className, valueType, value, updateValue, title, onClick }) {
	const [state, setState] = useState(value);
	const [changed, setChanged] = useState(false);
	useEffect(() => {
		setState(value);
	}, [value]);

	switch (valueType) {
		case "text":
			return (
				<input
					className={classNames(classes.cell, className)}
					value={state}
					onChange={(e) => {
						setState(e.target.value);
						setChanged(true);
					}}
					onBlur={(e) => {
						if (changed) {
							updateValue(state);
							setChanged(false);
						}
					}}
					title={title}
				/>
			);
		case "boolean":
			return (
				<div
					className={classNames(
						classes.cell,
						className,
						state && classes.highlight
					)}
					onClick={(e) => {
						updateValue(!state);
						setState(!state);
					}}
					title={title}
				>
					{/* {state ? "Y" : "N"} */}
					{state ? "√" : ""}
				</div>
			);
		case "statictext":
			return (
				<div
					className={classNames(classes.cell, className)}
					title={title}
					onClick={onClick}
				>
					{state}
				</div>
			);
		default:
	}
	return <div className={classNames(classes.cell, className)}>{"ERROR"}</div>;
}

export default CellEx;
