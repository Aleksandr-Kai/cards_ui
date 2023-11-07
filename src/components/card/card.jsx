import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";

const Card = ({ word, flipped, ...props }) => {
	const disabled = flipped === undefined;
	const dragStart = (event) => {
		event.target.style.opacity = "0.1";
		event.currentTarget.style.outline = "1px dashed rgba(0, 0, 0, .2)";
		event.currentTarget.classList.remove(classes.flipped);
	};
	const dragEnd = (event) => {
		event.target.removeAttribute("style");
		event.currentTarget.removeAttribute("style");
		event.currentTarget.classList.remove(classes.flipped);
	};
	const getClass = (flipped) => {
		return flipped ? classNames(classes.card, classes.flipped) : classes.card;
	};
	const [flipCard, setFlipCard] = useState(getClass(flipped));
	useEffect(() => {
		setFlipCard(getClass(flipped));
	}, [flipped]);
	return (
		<div
			className={classes.container}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			draggable={word && !disabled}
		>
			<div className={flipCard} onDragOver={props.onDragOver} onDrop={props.onDrop}>
				<div
					className={word !== undefined ? classes.cardface : classes.cardplace}
					draggable={word && !disabled}
					type={props.type}
				>
					{word ? (
						<>
							<h1>{word.word}</h1>
							<h2>{word.word}</h2>
						</>
					) : (
						<h1>No Cards</h1>
					)}
				</div>
				{word &&
					(disabled || (
						<div
							className={classNames(classes.cardface, classes.cardfaceback)}
						>
							<h1>{word.meaning}</h1>
						</div>
					))}
			</div>
		</div>
	);
};

export default Card;
