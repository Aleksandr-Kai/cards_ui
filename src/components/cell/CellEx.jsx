import classNames from "classnames";
import classes from "./cell.module.css";
import { useEffect, useState } from "react";

function CellEx({ className, valueType, value, updateValue }) {
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
                />
            );
        case "boolean":
            return (
                <div
                    className={classNames(classes.cell, className)}
                    onClick={(e) => {
                        updateValue(!state);
                        setState(!state);
                    }}
                >
                    {state ? "Yes" : "No"}
                </div>
            );
        case "statictext":
            return (
                <div className={classNames(classes.cell, className)}>
                    {state}
                </div>
            );
    }
    return (
        <input
            className={classNames(className, classes.cell)}
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
        />
    );
}

export default CellEx;
