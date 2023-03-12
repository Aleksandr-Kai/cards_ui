import React from 'react';
import classNames from "classnames";
import classes from "./styles.module.css";
import MyInput from "../ui/input/MyInput";
import DropDown from "../ui/dropdown/DropDown";

const SideBar = ({className, lists, ...props}) => {
    return (
        <nav className={classNames(classes.container, className)} {...props} >
            {lists.map(list=><DropDown name={list.name} words={list.words}/>)}
        </nav>
    );
};

export default SideBar;