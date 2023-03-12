import React from 'react';
import classNames from "classnames";
import classes from "./styles.module.css";

const Application = ({className, ...props}) => {
    return (
        <div className={classNames(className, classes.container)} >

        </div>
    );
};

export default Application;