import classNames from "classnames";
import classes from "./editlist.module.css";
import ListRow from "../listrow/ListRow";
import { useEffect, useState } from "react";
import CellButton from "../cell/CellButton";
import ListRowHeader from "../listrow/ListRowHeader";

const idPrefix = "#";

function EditList({ data, defaultRow, className, listUpdate }) {
    const [storedData, setStoredData] = useState(data);
    const [idCnt, setIdCnt] = useState(0);
    const [newRow, setNewRow] = useState({
        ...defaultRow,
        id: idPrefix + idCnt,
    });

    const handleNewRowUpdate = (newItem) => {
        if (newItem.action === "create") {
            setStoredData([...storedData, { ...newRow, action: "create" }]);
        } else {
            setNewRow(newItem);
        }
    };

    useEffect(() => {
        setIdCnt((id) => id + 1);
        setNewRow({
            ...defaultRow,
            id: idPrefix + idCnt,
        });
    }, [storedData]);

    return (
        <div
            className={classNames(className, classes.container)}
            onClick={(e) => e.stopPropagation()}
        >
            <div>
                <ListRowHeader />
                {storedData.map((item) => {
                    return (
                        Boolean(item.action !== "delete") && (
                            <ListRow
                                className={classes.list}
                                key={item.id}
                                data={item}
                                updateData={(newItem) => {
                                    if (
                                        newItem.action === "delete" &&
                                        newItem.id[0] === idPrefix
                                    ) {
                                        let newData = storedData.filter(
                                            (item) => item.id !== newItem.id
                                        );
                                        setStoredData(newData);
                                    } else {
                                        let index = storedData.findIndex(
                                            (row) => row.id === newItem.id
                                        );

                                        if (
                                            storedData[index].id[0] === idPrefix
                                        )
                                            newItem.action = "create";
                                        setStoredData([
                                            ...storedData.slice(0, index),
                                            newItem,
                                            ...storedData.slice(index + 1),
                                        ]);
                                    }
                                }}
                            />
                        )
                    );
                })}
                <ListRow
                    className={classes.list}
                    newItem={true}
                    data={newRow}
                    updateData={handleNewRowUpdate}
                />
            </div>
            <div className={classes.btnBox}>
                <CellButton
                    className={classes.btn}
                    text={"Ok"}
                    action={() => listUpdate(storedData)}
                />
                <CellButton
                    className={classes.btn}
                    text={"Cancel"}
                    action={() => {
                        console.log(storedData);
                        listUpdate();
                    }}
                />
            </div>
        </div>
    );
}

export default EditList;
