import { DragEvent, DragEventHandler, useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.css";
import { TWord } from "../../tools/types";

type TCardProps = {
	type?: string;
	word?: TWord;
	onDragOver?: DragEventHandler<HTMLDivElement>;
	onDrop?: DragEventHandler<HTMLDivElement>;
	flipped?: boolean;
};

export const Card = ({ type, word, flipped, onDragOver, onDrop }: TCardProps) => {
	const disabled = flipped === undefined;
	const [flipCard, setFlipCard] = useState(classes.card);

	useEffect(() => {
		setFlipCard(flipped ? classNames(classes.card, classes.flipped) : classes.card);
	}, [flipped]);

	const dragStart = (event: DragEvent<HTMLDivElement>) => {
		(event.target as HTMLElement).style.opacity = "0.1";
		(event.currentTarget as HTMLElement).style.outline =
			"1px dashed rgba(0, 0, 0, .2)";
		(event.currentTarget as HTMLElement).classList.remove(classes.flipped);
	};

	const dragEnd = (event: DragEvent<HTMLDivElement>) => {
		(event.target as HTMLElement).removeAttribute("style");
		(event.currentTarget as HTMLElement).removeAttribute("style");
		(event.currentTarget as HTMLElement).classList.remove(classes.flipped);
	};

	return (
		<div
			className={classes.container}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			draggable={word && !disabled}
		>
			<div className={flipCard} onDragOver={onDragOver} onDrop={onDrop}>
				<div
					className={word !== undefined ? classes.cardface : classes.cardplace}
					draggable={word && !disabled}
					data-type={type}
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
							<h1>{word.translation}</h1>
						</div>
					))}
			</div>
		</div>
	);
};
