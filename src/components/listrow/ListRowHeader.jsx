import classNames from "classnames";
import classes from "./listrow.module.css";
import classesEx from "./celldecor.module.css";
import CellEx from "../cell/CellEx";

function ListRowHeader({ className, checkAll }) {
	return (
		<div className={classNames(className, classes.row)}>
			<CellEx
				className={classNames(classes.cell, classesEx.decorHeader)}
				valueType={"statictext"}
				value={"Word"}
			/>
			<CellEx
				className={classNames(classes.cell, classesEx.decorHeader)}
				valueType={"statictext"}
				value={"Translation"}
			/>
			<CellEx
				className={classNames(classes.boolcell, classesEx.decorHeader)}
				valueType="statictext"
				value={"☑"}
				title={"Word status"}
				onClick={checkAll}
			/>
			<CellEx
				className={classNames(classes.boolcell, classesEx.decorHeader)}
				valueType="statictext"
				value={"⇌"}
				title={"Delete or create word position"}
			/>
		</div>
	);
}

export default ListRowHeader;
