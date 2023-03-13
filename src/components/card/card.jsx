import React,{useRef} from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Card = ({ className, word, meaning, ...props }) => {
    const flipper = useRef(null)
    const flip = () => {
        flipper.current.classList.toggle(
            classes.flipped
        );
    };
    return (
        <div
            className={classNames(className, classes.container)}
            onClick={flip}
        >
            <div className={classes.card} ref={flipper}>
                <div
                    className={classNames(
                        classes.cardface,
                        classes.cardfacefront
                    )}
                >
                    <h1>{word}</h1>
                    <h2>{word}</h2>
                </div>
                <div
                    className={classNames(
                        classes.cardface,
                        classes.cardfaceback
                    )}
                >
                    <h1>{meaning}</h1>
                </div>
            </div>
        </div>
    );
};

export default Card;
