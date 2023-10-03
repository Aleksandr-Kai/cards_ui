import classNames from "classnames";
import classes from "./listrow.module.css";
import Cell from "../cell/Cell";
import CellButton from "../cell/CellButton";
import { useEffect, useState } from "react";

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
            {/* <div className={classes.data}>{JSON.stringify(data)}</div> */}
        </div>
    );
}

export default ListRow;
