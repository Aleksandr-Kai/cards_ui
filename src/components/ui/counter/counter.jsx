import React,{useState} from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Counter = ({ className,value, ...props }) => {
    return (
        <div className={classNames(className, classes.counter)}>
            {value>9999?"Many":value<0?"Err":value}
        </div>
    );
};

export default Counter;
