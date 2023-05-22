import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import classes from "./styles.module.css";
import SideBar from "./components/sidebar/SideBar";
import Application from "./components/MainFrame/MainFrame";
import { getRequest } from "./apitools.js";

function App() {
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState([]);

	const updateLists = (loadLists) => {
		if (loadLists)
			getRequest("/lists")
				.then((data) => {
					if (data.error) {
						console.log(data.error);
						setLists([]);
						return;
					}
					setLists(data.Lists);
				})
				.catch((err) => alert(`Catched error: ${err.message}`));
		else setLists([]);
	};

	useEffect(() => {
		if (localStorage.token) updateLists(true);
	}, []);

	const selectList = (event) => {
		let id = event.target.getAttribute("id");
		getRequest(`/lists/${id}/words`).then((data) => {
			let words = data.Words.filter((word) => {
				return !word.studied;
			}).map((word) => {
				return { id: word.id, word: word.word, meaning: word.translation };
			});
			setSelectedList(words);
		});
		// setSelectedList([...testWords]);
		// console.log(selectedList);
	};

	return (
		<div className={classes.wrapper}>
			<Header className={classes.header} onAuth={updateLists} />
			<div className={classes.bodycontainer}>
				<SideBar
					className={classes.sidebar}
					lists={lists}
					onSelect={selectList}
				/>
				<Application className={classes.content} words={selectedList} />
			</div>
		</div>
	);
}

export default App;
