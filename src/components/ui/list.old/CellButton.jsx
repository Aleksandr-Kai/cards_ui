import classes from "./list.module.css";

function CellButton({ action, text }) {
	return (
		<div className={classes.cell} onClick={action}>
			{text}
		</div>
	);
}
export default CellButton;
