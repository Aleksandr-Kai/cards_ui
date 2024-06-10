import { DragEvent, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import { Card } from "../card/card";
import Counter from "../ui/counter/counter";
import { apiRequest, getRequest } from "../../apitools.js";
import { TWordList } from "../../tools/types";
import { TApiWordModel } from "src/api/types";

async function requestWords(list: TWordList) {
	return getRequest(`/lists/${list.id}/words`).then((data) => {
		return data.Words;
	});
}
// function filterUnstudiedWords(words: TWord[]) {
// 	return words.filter((word) => !word.studied);
// }
async function setWordAsStudied(word: TApiWordModel) {
	apiRequest("PUT", `/lists/${word.ListId}/words/${word.id}`, {
		Word: { studied: true },
	}).then((data) => console.log(data));
}

type TMainFrameProps = {
	className?: string;
	list: TWordList | null;
	filter: (data: unknown) => unknown;
};
export const MainFrame = ({ className, list, filter }: TMainFrameProps) => {
	const [listWords, setListWords] = useState([]);
	const [studied, setStudied] = useState([]);
	const [unstudied, setUnStudied] = useState([]);

	const loadWords = useCallback(() => {
		list &&
			requestWords(list)
				.then((data) => data.filter(filter))
				.then(setListWords);
	}, [filter, list]);

	useEffect(() => {
		list ? loadWords() : setListWords([]);
		setStudied([]);
		setUnStudied([]);
	}, [list, loadWords]);

	const getCurrentWord = () => {
		return listWords.length > 0 ? listWords[0] : undefined;
	};

	const nextWord = () => {
		setFlipCard(false);
		if (listWords.length === 0) return false;
		setListWords(listWords.slice(1));
		return true;
	};

	const dragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const dragDrop = (event: DragEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		const parentNode = target.parentNode as HTMLElement;
		let attr =
			target.getAttribute("data-type") || parentNode.getAttribute("data-type");
		switch (attr) {
			case "studied":
				setStudied([listWords[0], ...studied]);
				setWordAsStudied(listWords[0]);
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
		setFlipCard(!flippedCard && listWords.length > 0);
	};

	const setClassNames = (className: string) => {
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
				<div
					className={classes.button}
					onClick={() => {
						setStudied([]);
						setUnStudied([]);
						loadWords();
					}}
				>
					Refresh List
				</div>
				<br />
				<br />
				<span className={classes.repeat}>REPEAT</span>
				<div
					className={classes.button}
					onClick={() => {
						setListWords([...studied, ...unstudied]);
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
