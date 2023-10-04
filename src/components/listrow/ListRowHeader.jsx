import classNames from "classnames";
import classes from "./listrow.module.css";
import classesEx from "./celldecor.module.css";
import CellEx from "../cell/CellEx";

function ListRowHeader({ className }) {
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
                value={"St"}
                title={"Word status"}
            />
            <CellEx
                className={classNames(classes.boolcell, classesEx.decorHeader)}
                valueType="statictext"
                value={"RM"}
                title={"Delete or create word position"}
            />
        </div>
    );
}

export default ListRowHeader;
