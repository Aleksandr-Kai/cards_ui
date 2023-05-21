import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import classes from "./styles.module.css";
import SideBar from "./components/sidebar/SideBar";
import Application from "./components/MainFrame/MainFrame";
import { getRequest } from "./apitools.js";

function App() {
	const [lists, setLists] = useState([]);

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
		if (localStorage.token) updateLists();
	}, []);

	return (
		<div className={classes.wrapper}>
			<Header className={classes.header} onAuth={updateLists} />
			<div className={classes.bodycontainer}>
				<SideBar className={classes.sidebar} lists={lists} />
				<Application className={classes.content} />
			</div>
		</div>
	);
}

export default App;
