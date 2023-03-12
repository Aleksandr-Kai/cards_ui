import React from 'react';
import classes from "./styles.module.css";

const MyInput = ({ type, ...props}) => {
    return (
        <input {...props} type={type} className={classes.inp} />
    );
};

export default MyInput;