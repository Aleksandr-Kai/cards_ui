import classNames from "classnames";
import classes from "./cell.module.css";
import ContentEditable from "react-contenteditable";
import { useEffect, useState } from "react";

function Cell({ className, text, updateValue }) {
    const [state, setState] = useState(text);
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        setState(text);
    }, [text]);
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

export default Cell;
