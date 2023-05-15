import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import classes from "./styles.module.css";
import DropDown from "../ui/dropdown/DropDown";
import { getRequest } from "../../apitools.js";

const SideBar = ({className, showList, ...props}) => {
    const [lists, setLists] = useState([]);

    useEffect(() =>
		{
            if(showList)
            getRequest("/lists")
			.then((data) => {
				if (data.error) {
					alert(data.error);
					return [];
				}
				return data.Lists;
			})
			.then((lists) => {
				let promises = lists.map((list, index) =>
					getRequest(`/lists/${list.id}/words`).then((data) => {
						lists[index].words = data.Words.map((word) => word.word);
					})
				);
				Promise.all(promises).then(() => {
					setLists(lists);
				});
			})
			.catch((err) => alert(err));
        else
            setLists([]);
    }, [showList])

    return (
        <nav className={classNames(classes.container, className)} {...props} >
            {lists.map(list=><DropDown key={list.name} name={list.name} words={list.words}/>)}
        </nav>
    );
};

export default SideBar;