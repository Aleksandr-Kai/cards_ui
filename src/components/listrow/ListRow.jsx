import classNames from "classnames";
import classes from "./listrow.module.css";
import Cell from "../cell/Cell";
import CellButton from "../cell/CellButton";
import CellEx from "../cell/CellEx";

function ListRow({ className, data, updateData, newItem }) {
    return (
        <div className={classNames(className, classes.row)}>
            <Cell
                className={classes.cell}
                text={data.word}
                updateValue={(value) =>
                    updateData({ ...data, action: "update", word: value })
                }
            />
            <Cell
                className={classes.cell}
                text={data.translation}
                updateValue={(value) =>
                    updateData({
                        ...data,
                        action: "update",
                        translation: value,
                    })
                }
            />
            {newItem ? (
                <CellEx
                    className={classes.boolcell}
                    valueType="statictext"
                    value={"No"}
                />
            ) : (
                <CellEx
                    className={classes.boolcell}
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
                text={newItem ? "+" : "X"}
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
