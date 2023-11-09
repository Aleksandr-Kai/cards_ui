import React, { useState } from "react";
import Header from "./components/header/Header";
import classes from "./app.module.css";
import WordLists from "./components/wordlists/WordLists";
import Application from "./components/Application/Application";
import AuthForm from "./components/authform/AuthForm";

function App() {
	const [currentWords, setCurrentWords] = useState([]);
	const [showLists, setShowLists] = useState(false);
	const [currentList, setCurrentList] = useState(null);

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
						<WordLists
							className={classes.sidebar}
							selectList={(list) => {
								setShowLists(false);
								setCurrentList(list);
							}}
						/>
					)}
					<Application initialWords={currentWords} list={currentList} />
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
