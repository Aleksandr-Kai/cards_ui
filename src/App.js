import React, { useState } from "react";
import Header from "./components/header/Header";
import classes from "./styles.module.css";
import SideBar from "./components/sidebar/SideBar";
import Application from "./components/application/Application";

function App() {
	const [auth, setAuth] = useState(false);

	return (
		<div className={classes.wrapper}>
			<Header className={classes.header} onAuth={setAuth} />
			<div className={classes.bodycontainer}>
				<SideBar className={classes.sidebar} showList={auth} />
				<Application className={classes.content} />
			</div>
		</div>
	);
}

export default App;
