import classNames from "classnames";
import classesEx from "./celldecor.module.css";
import classes from "./listrow.module.css";
import CellButton from "../cell/CellButton";
import CellEx from "../cell/CellEx";

function ListRow({ className, data, updateData, newItem }) {
	return (
		<div className={classNames(className, classes.row)}>
			{data.studied ? (
				<>
					<CellEx
						className={classNames(
							classes.cell,
							classesEx.decorCell,
							classesEx.decorStudied
						)}
						valueType="statictext"
						value={data.word}
					/>
					<CellEx
						className={classNames(
							classes.cell,
							classesEx.decorCell,
							classesEx.decorStudied
						)}
						valueType="statictext"
						value={data.translation}
					/>
				</>
			) : (
				<>
					<CellEx
						className={classNames(classes.cell, classesEx.decorCell)}
						valueType="text"
						value={data.word}
						updateValue={(value) =>
							updateData({
								...data,
								action: "update",
								word: value,
							})
						}
					/>
					<CellEx
						className={classNames(classes.cell, classesEx.decorCell)}
						valueType="text"
						value={data.translation}
						updateValue={(value) =>
							updateData({
								...data,
								action: "update",
								translation: value,
							})
						}
					/>
				</>
			)}
			{newItem ? (
				<CellEx
					className={classNames(
						classes.boolcell,
						classesEx.decorCell,
						data.word == "" && data.translation == "" && classesEx.graytext
					)}
					valueType="statictext"
					value={""}
				/>
			) : (
				<CellEx
					className={classNames(
						classes.boolcell,
						classesEx.decorCell
						// data.studied && classesEx.graytext
					)}
					valueType="boolean"
					value={data.studied}
					updateValue={(value) =>
						updateData({
							...data,
							action: "update",
							studied: value,
						})
					}
				/>
			)}
			<CellButton
				className={classesEx.decorCell}
				text={newItem ? "✛" : "✖"}
				action={() => {
					if (data.word === "" || data.translation === "") {
						alert("Can not create");
						return;
					}
					updateData({
						...data,
						action: newItem ? "create" : "delete",
					});
				}}
			/>
		</div>
	);
}

export default ListRow;
