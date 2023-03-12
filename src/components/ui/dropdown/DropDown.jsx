import React from 'react';
import classes from "./styles.module.css";

const DropDown = ({name,words, ...props}) => {
    return (
        <div className={classes.dropdown} >
            <div className={classes.listName}>{name}</div>
            <ul className={classes.listWords}>
                {words.map(word=><li>{word}</li>)}
            </ul>
        </div>
    );
};

export default DropDown;