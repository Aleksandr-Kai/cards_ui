import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import classes from "./app.module.css";
import WordLists from "./components/wordlists/WordLists";
import { MainFrame as Application } from "./components/Application/Application";
import AuthForm from "./components/authform/AuthForm";
import MessageBox from "./components/messagemox/MessageBox";
import { apiRequest, getRequest, postRequest } from "./apitools.js";
import {
	TApiResponceWordCount,
	TApiWordCount,
	TDialog,
	TWord,
	TWordList,
} from "./tools/types";

async function countWords(list: TWordList) {
	return getRequest(`/lists/${list.id}/words?count`).then(
		(data: TApiResponceWordCount) => {
			let res: TApiWordCount = { studied: 0, unstudied: 0 };
			data.forEach((d) => {
				if (d.studied) res.studied = d.count;
				else res.unstudied = d.count;
			});
			return res;
		}
	);
}

// todo remove it
function noFilter(data: any) {
	return data;
}

function App() {
	const [currentWords, setCurrentWords] = useState([]); // todo remove it
	const [showLists, setShowLists] = useState(false);
	const [currentList, setCurrentList] = useState<TWordList | null>(null);
	const [message, setMessage] = useState<TDialog | null>(null);
	const [wordsFilter, setFilter] = useState(() => noFilter); // todo remove it

	return (
		<div className={classes.wrapper} onClick={() => setShowLists(false)}>
			<Header
				className={classes.header}
				toggleListsSidebar={(event: Event) => {
					event.stopPropagation();
					setShowLists(!showLists);
				}}
				onLogout={() => setCurrentWords([])}
			/>
			{Boolean(localStorage.token) ? (
				<>
					{showLists && (
						<WordLists
							className={classes.sidebar}
							selectList={async (list: TWordList) => {
								setShowLists(false);
								let { unstudied, studied } = await countWords(list);

								if (unstudied > 0) {
									if (studied === 0) {
										setFilter(() => noFilter);
										setCurrentList(list);
									} else {
										setMessage({
											title: "Partially studied",
											text: "The list contains learned words. What do you want to learn?",
											actions: [
												{
													name: "All",
													callback: () => {
														setFilter(() => noFilter);
														setCurrentList(list);
														setMessage(null);
													},
												},
												{
													name: "Unliearnd",
													callback: () => {
														setFilter(
															() => (word: TWord) =>
																!word.studied
														);
														setCurrentList(list);
														setMessage(null);
													},
												},
												{
													name: "Nothing",
													callback: () => {
														setMessage(null);
													},
												},
											],
										});
									}
								} else if (studied === 0) {
									setMessage({
										title: "List is empty",
										text: "The list contains no words",
										actions: [
											{
												name: "Understood",
												callback: () => {
													setMessage(null);
												},
											},
										],
									});
								} else {
									setMessage({
										title: "List learned",
										text: "There are no unlearned words in the list. Do you want to repeat ALL?",
										actions: [
											{
												name: "Yes",
												callback: () => {
													setFilter(() => noFilter);
													setCurrentList(list);
													setMessage(null);
												},
											},
											{
												name: "No",
												callback: () => {
													setMessage(null);
												},
											},
										],
									});
								}
							}}
						/>
					)}
					<Application list={currentList} filter={wordsFilter} />
				</>
			) : (
				<AuthForm
					resolve={() => setCurrentWords([])}
					reject={(err) => console.log(`Error: ${err}`)}
					message={(text) =>
						setMessage({
							title: "Authorization",
							text: text,
							actions: [
								{
									name: "Ok",
									callback: () => {
										setMessage(null);
									},
								},
							],
						})
					}
				/>
			)}
			{Boolean(message) && (
				<MessageBox
					title={message?.title || ""}
					text={message?.text || ""}
					actions={message?.actions || []}
				/>
			)}
		</div>
	);
}

export default App;
