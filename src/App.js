import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import classes from "./app.module.css";
import WordLists from "./components/wordlists/WordLists";
import Application from "./components/Application/Application";
import AuthForm from "./components/authform/AuthForm";
import MessageBox from "./components/messagemox/MessageBox";
import { apiRequest, getRequest, postRequest } from "./apitools.js";

async function countWords(list) {
	return getRequest(`/lists/${list.id}/words?count`).then((data) => {
		let res = { studied: 0, unstudied: 0 };
		data.forEach((d) => {
			if (d.studied) res.studied = d.count;
			else res.unstudied = d.count;
		});
		return res;
	});
}

function noFilter(data) {
	return data;
}

function App() {
	const [currentWords, setCurrentWords] = useState([]);
	const [showLists, setShowLists] = useState(false);
	const [currentList, setCurrentList] = useState(null);
	const [message, setMessage] = useState(null);
	const [wordsFilter, setFilter] = useState(() => noFilter);

	return (
		<div className={classes.wrapper} onClick={() => setShowLists(false)}>
			<Header
				className={classes.header}
				toggleListsSidebar={(event) => {
					event.stopPropagation();
					setShowLists(!showLists);
				}}
				onLogout={() => setCurrentWords([])}
				setMessage={setMessage}
			/>
			{Boolean(localStorage.token) ? (
				<>
					{showLists && (
						<WordLists
							className={classes.sidebar}
							selectList={async (list) => {
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
															() => (word) => !word.studied
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
					title={message.title}
					text={message.text}
					actions={message.actions}
				/>
			)}
		</div>
	);
}

export default App;
