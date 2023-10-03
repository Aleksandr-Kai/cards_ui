import { useEffect, useState } from "react";
import CellButton from "./CellButton";
import classes from "./list.module.css";
import ContentEditable from "react-contenteditable";

function ListRow({ data, onChange }) {
	return (
		<div className={classes.row}>
			<ContentEditable
				className={classes.cell}
				html={data.word}
				onBlur={(e) =>
					onChange({
						...data,
						word: e.currentTarget.textContent,
						action: "update",
					})
				}
			/>
			<ContentEditable
				className={classes.cell}
				html={data.translation}
				onBlur={(e) =>
					onChange({
						...data,
						translation: e.currentTarget.textContent,
						action: "update",
					})
				}
			/>
			<CellButton
				action={() =>
					onChange({
						...data,
						action: "delete",
					})
				}
				text={data.word ? "X" : "+"}
			/>
		</div>
	);
}
export default ListRow;
