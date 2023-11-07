import React, { useState } from "react";
import Header from "./components/header/Header";
import classes from "./app.module.css";
import MenuWordLists from "./components/menuwordlists/MenuWordLists";
import Application from "./components/MainFrame/MainFrame";
import AuthForm from "./components/authform/AuthForm";

function App() {
	const [currentWords, setCurrentWords] = useState([]);
	const [showLists, setShowLists] = useState(false);

	return (
		<div className={classes.wrapper} onClick={() => setShowLists(false)}>
			<Header
				className={classes.header}
				toggleListsSidebar={(event) => {
					event.stopPropagation();
					setShowLists(!showLists);
				}}
				onLogout={() => setCurrentWords([])}
			/>
			{Boolean(localStorage.token) ? (
				<>
					{showLists && (
						<MenuWordLists
							className={classes.sidebar}
							onSelect={(words) => {
								setShowLists(false);
								setCurrentWords(words);
							}}
						/>
					)}
					<Application initialWords={currentWords} />
				</>
			) : (
				<AuthForm
					resolve={() => setCurrentWords([])}
					reject={(err) => console.log(`Error: ${err}`)}
				/>
			)}
		</div>
	);
}

export default App;
