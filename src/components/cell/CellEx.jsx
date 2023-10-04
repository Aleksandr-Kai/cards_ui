import classNames from "classnames";
import classes from "./cell.module.css";
import { useEffect, useState } from "react";

function CellEx({ className, valueType, value, updateValue, title }) {
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
                    {state ? "Y" : "N"}
                </div>
            );
        case "statictext":
            return (
                <div
                    className={classNames(classes.cell, className)}
                    title={title}
                >
                    {state}
                </div>
            );
    }
    return <div className={classNames(classes.cell, className)}>{"ERROR"}</div>;
}

export default CellEx;
