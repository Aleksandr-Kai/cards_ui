import classNames from "classnames";
import classes from "./listrow.module.css";
import CellEx from "../cell/CellEx";

function ListRowHeader({ className }) {
    return (
        <div className={classNames(className, classes.row)}>
            <CellEx
                className={classNames(classes.cell, classes.header)}
                valueType={"statictext"}
                value={"Word"}
            />
            <CellEx
                className={classNames(classes.cell, classes.header)}
                valueType={"statictext"}
                value={"Translation"}
            />
            <CellEx
                className={classNames(classes.boolcell, classes.header)}
                valueType="statictext"
                value={"St"}
            />
            <CellEx
                className={classNames(classes.boolcell, classes.header)}
                valueType="statictext"
                value={"RM"}
            />
        </div>
    );
}

export default ListRowHeader;
