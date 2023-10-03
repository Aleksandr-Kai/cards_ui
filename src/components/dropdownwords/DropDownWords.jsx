import React from "react";
import classes from "./dropdownwords.module.css";
const selectList = (event) => {
	document.getElementById("Lists").style.visibility = "hidden";
	let id = event.target.getAttribute("id");
	getRequest(`/lists/${id}/words`).then((data) => {
		let words = data.Words.filter((word) => {
			return !word.studied;
		}).map((word) => {
			return { id: word.id, word: word.word, meaning: word.translation };
		});
		onSelect(words);
	});
};
const DropDownWords = ({ id, name, words, ...props }) => {
	let index = 0;
	return (
		<div className={classes.dropdown} {...props}>
			<div className={classes.listName} id={id}>
				{name}
			</div>
			{words.length > 0 ? (
				<ul className={classes.listWords}>
					{words.map((word) => (
						<li key={Date.now() + name + word + index++}>{word}</li>
					))}
				</ul>
			) : (
				<div className={classes.listWords}>
					<p className={classes.textEmpty}>Empty list</p>
				</div>
			)}
		</div>
	);
};

export default DropDownWords;
