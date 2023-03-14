import React, { useRef } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Card = ({ className, word, disabled, children, id, onClick, ...props }) => {
    return (
        <div
            className={classNames(className, classes.container)} 
            onClick={disabled ? null : onClick}
            {...props}
        >
            <div className={classes.card}>
                <div
                    id={id}
                    className={classNames(
                        classes.cardface,
                        classes.cardfacefront
                    )}
                >
                    <h1>{word.word}</h1>
                    <h2>{word.word}</h2>
                </div>
                {disabled || (
                    <div
                        className={classNames(
                            classes.cardface,
                            classes.cardfaceback
                        )}
                    >
                        <h1>{word.meaning}</h1>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Card;
