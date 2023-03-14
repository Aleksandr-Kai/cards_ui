import React, { useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import Card from "../card/card";
import Counter from "../ui/counter/counter";

const testWord = {
    id: 0,
    word: "TestWord",
    meaning: "TestMeaning",
};

const testReplaceWord = {
    id: 1,
    word: "ReplaceWord",
    meaning: "ReplaceMeaning",
};

const Application = ({ className, ...props }) => {
    const [words, setWords] = useState({
        current: testWord,
        studied: {},
        unstudied: {},
    });
    const [counters, setCounters] = useState({ all: 0, ok: 0, not: 0 });
    const dragOver = (event) => {
        event.preventDefault();
    };
    const dragDrop = (event) => {
        setWords({
            ...words,
            [event.target.id]: words.current,
            current: testReplaceWord,
        });
    };
    const dragStart = (event) => {
        event.target.style.opacity = ".4";
        event.currentTarget.firstChild.classList.remove(classes.flipped);
    };
    const dragEnd = (event) => {
        event.target.removeAttribute("style");
    };
    const cardClick = (event) => {
        event.currentTarget.firstChild.classList.toggle(classes.flipped);
    };
    return (
        <div className={classNames(className, classes.container)}>
            <div className={classes.hdr}></div>
            <div className={classes.lpnl}>
                <Card
                    draggable="true"
                    className={classes.card}
                    word={words.current}
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}
                    onClick={cardClick}
                />
                <Counter className={classes.counter2} value={counters.all} />
            </div>
            <div className={classes.mdl}></div>
            <div className={classes.rpnl}>
                <Card
                    id={"studied"}
                    className={classes.card}
                    word={words.studied}
                    disabled
                    onDragOver={dragOver}
                    onDrop={dragDrop}
                >
                    <Counter className={classes.counter} value={counters.ok} />
                </Card>
                <Card
                    id={"unstudied"}
                    className={classes.card}
                    word={words.unstudied}
                    disabled
                    onDragOver={dragOver}
                    onDrop={dragDrop}
                >
                    <Counter className={classes.counter} value={counters.not} />
                </Card>
            </div>
            <div className={classes.ftr}></div>
        </div>
    );
};

export default Application;
