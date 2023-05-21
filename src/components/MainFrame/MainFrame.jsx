import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import Card from "../card/card";
import Counter from "../ui/counter/counter";

// const testWords = [
// 	{
// 		id: 0,
// 		word: "TestWord",
// 		meaning: "TestMeaning",
// 	},
// 	{
// 		id: 1,
// 		word: "ReplaceWord",
// 		meaning: "ReplaceMeaning",
// 	},
// 	{
// 		id: 2,
// 		word: "ReplaceWord 2",
// 		meaning: "ReplaceMeaning 2",
// 	},
// 	{
// 		id: 3,
// 		word: "ReplaceWord 3",
// 		meaning: "ReplaceMeaning 3",
// 	},
// ];

const MainFrame = ({ className, words }) => {
	words = words || [];
	const [listWords, setListWords] = useState([...words]);
	const [studied, setStudied] = useState([]);
	const [unstudied, setUnStudied] = useState([]);

	const getCurrentWord = () => {
		return listWords.length > 0 ? listWords[0] : undefined;
	};

	const nextWord = () => {
		setFlipCard(false);
		if (listWords.length === 0) return false;
		setListWords(listWords.slice(1));
		return true;
	};
	const dragOver = (event) => {
		event.preventDefault();
	};
	const dragDrop = (event) => {
		switch (event.target.getAttribute("type")) {
			case "studied":
				setStudied([listWords[0], ...studied]);
				break;
			case "unstudied":
				setUnStudied([listWords[0], ...unstudied]);
				break;
			default:
				break;
		}
		if (!flippedCard) {
			setFlipCard(true);
			setTimeout(() => {
				setFlipCard(false);
				nextWord();
			}, 150);
		} else {
			setFlipCard(false);
			setTimeout(nextWord, 250);
		}
	};
	const [flippedCard, setFlipCard] = useState(false);
	const flip = () => {
		setFlipCard(!flippedCard && listWords.length);
	};
	return (
		<div className={classNames(className, classes.container)}>
			<div className={classes.hdr}></div>
			<div className={classes.lpnl}>
				<div className={classes.stack} onClick={flip}>
					<Card word={getCurrentWord()} flipped={flippedCard} />
					<Counter value={listWords.length} />
				</div>
			</div>
			<div className={classes.mdl}></div>
			<div className={classes.rpnl}>
				<div className={classes.stack}>
					<Card
						type="studied"
						word={studied[0]}
						onDragOver={dragOver}
						onDrop={dragDrop}
					/>
					<Counter value={studied.length} />
				</div>
				<div className={classes.stack}>
					<Card
						type="unstudied"
						word={unstudied[0]}
						onDragOver={dragOver}
						onDrop={dragDrop}
					/>
					<Counter value={unstudied.length} />
				</div>
			</div>
			<div className={classes.ftr}></div>
		</div>
	);
};

export default MainFrame;
