import React from 'react';
import classes from "./MyButton.module.css";
import classnames from "classnames";

const MyButton = ({children, className, ...props}) => {
    return (
        <button {...props} className={classnames(classes.btn,className)}>
            {children}
        </button>
    );
};

export default MyButton;