import classNames from "classnames";
import classes from "./cell.module.css";

function CellButton({ className, text, action }) {
	return (
		<div className={classNames(classes.cell, className)} onClick={action}>
			{text}
		</div>
	);
}

export default CellButton;
