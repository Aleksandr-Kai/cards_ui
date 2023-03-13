import React from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import Card from "../card/card";

const Application = ({ className, ...props }) => {
    return (
        <div className={classNames(className, classes.container)}>
            {/*<Card className={classes.card} word={"word"} meaning={"meaning"} />*/}
            <div className={classes.hdr}>

            </div>
            <div className={classes.lpnl}>
                <Card className={classes.card} word={"word"} meaning={"meaning"} />
            </div>
            <div className={classes.mdl}>

            </div>
            <div className={classes.rpnl}>
                <Card className={classes.card} word={"word"} meaning={"meaning"} />
                <Card className={classes.card} word={"word"} meaning={"meaning"} />
            </div>
            <div className={classes.ftr}>

            </div>
        </div>
    );
};

export default Application;
