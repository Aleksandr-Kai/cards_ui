import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import Card from "../card/card";
import Counter from "../ui/counter/counter";

const MainFrame = ({ className, initialWords }) => {
	const [listWords, setListWords] = useState(initialWords);
	const [studied, setStudied] = useState([]);
	const [unstudied, setUnStudied] = useState([]);

	useEffect(() => {
		setListWords(initialWords);
		setStudied([]);
		setUnStudied([]);
	}, [initialWords]);

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
		let attr =
			event.target.getAttribute("type") ||
			event.target.parentNode.getAttribute("type");
		switch (attr) {
			case "studied":
				setStudied([listWords[0], ...studied]);
				break;
			case "unstudied":
				setUnStudied([listWords[0], ...unstudied]);
				break;
			default:
				return;
		}
		if (!flippedCard) {
			nextWord();
		} else {
			setFlipCard(false);
			setTimeout(nextWord, 250);
		}
	};
	const [flippedCard, setFlipCard] = useState(false);
	const flip = () => {
		setFlipCard(!flippedCard && listWords.length);
	};

	const setClassNames = (className) => {
		return listWords.length === 0 && (studied.length > 0 || unstudied.length > 0)
			? className
			: classNames(className, classes.hidden);
	};
	return (
		<div className={classNames(className, classes.container)}>
			<div className={classes.lpnl}>
				<div className={classes.stack} onClick={flip}>
					<Card word={getCurrentWord()} flipped={flippedCard} />
					<Counter value={listWords.length} />
				</div>
			</div>
			<div className={setClassNames(classes.mdl)}>
				{/* <div className={classes.button} onClick={() => {}}>
					Fihish
				</div>
				<br />
				<br /> */}
				<span className={classes.repeat}>REPEAT</span>
				<div
					className={classes.button}
					onClick={() => {
						setListWords(initialWords);
						setStudied([]);
						setUnStudied([]);
					}}
				>
					All
				</div>
				{unstudied.length > 0 && (
					<div
						className={classes.button}
						onClick={() => {
							setListWords(unstudied);
							setStudied([]);
							setUnStudied([]);
						}}
					>
						Unstudied
					</div>
				)}
			</div>
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
				<div className={classes.like} />
				<div className={classes.stack}>
					<Card
						type="unstudied"
						word={unstudied[0]}
						onDragOver={dragOver}
						onDrop={dragDrop}
					/>
					<Counter value={unstudied.length} />
				</div>
				<div className={classes.dislike} />
			</div>
			<div className={classes.ftr}></div>
		</div>
	);
};

export default MainFrame;
