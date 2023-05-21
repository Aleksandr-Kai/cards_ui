import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import DropDown from "../ui/dropdown/DropDown";
import { getRequest } from "../../apitools.js";

const SideBar = ({ className, lists, ...props }) => {
	const [fullLists, setLists] = useState([]);

	useEffect(() => {
		let result = [];
		let promises = lists.map((list) =>
			getRequest(`/lists/${list.id}/words`).then((data) => {
				result.push({
					name: list.name,
					words: data.Words.map((word) => word.word),
				});
			})
		);
		Promise.all(promises).then(() => {
			setLists(result);
		});
	}, [lists]);

	return (
		<nav className={classNames(classes.container, className)} {...props}>
			{fullLists.map((list) => (
				<DropDown key={list.name} name={list.name} words={list.words} />
			))}
		</nav>
	);
};

export default SideBar;
