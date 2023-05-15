import React, { useRef } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Card = ({ className, word, disabled, id, ...props }) => {
    const dragStart = (event) => {
        console.log(event.target)
        console.log(event.currentTarget)
        event.target.style.opacity = "0.1";
        event.currentTarget.style.border = "1px dotted black";
        event.currentTarget.classList.remove(classes.flipped);
    };
    const dragEnd = (event) => {
        event.target.removeAttribute("style");
        event.currentTarget.removeAttribute("style");
        event.currentTarget.classList.remove(classes.flipped);
    };
    const cardClick = (event) => {
        event.currentTarget.firstChild.classList.toggle(classes.flipped);
    };
    return (
        <div
            className={classNames(className, classes.container)}
            onClick={disabled ? null : cardClick}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
        >
            <div className={classes.card}
                 onDragOver={props.onDragOver}
                 onDrop={props.onDrop}
            >
                <div
                    id={id}
                    className={classes.cardface}
                    draggable={!disabled}
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
            </div>
        </div>
    );
};

export default Card;
