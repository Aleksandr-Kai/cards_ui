import React from "react";
import MyButton from "./components/ui/button/MyButton";
import InputWithButton from "./components/ui/inputbtn/InputWithButton";
import Header from "./components/header/Header";
import classes from "./styles.module.css";
import MyInput from "./components/ui/input/MyInput";
import SideBar from "./components/sidebar/SideBar";
import Application from "./components/application/Application";

function App() {
    const lists = [
        {name:"list1",words:["word1","woreeed2","word3","word4"]},
        {name:"list2",words:["word11","wordddss22","word33","word44"]},
        {name:"list3",words:["word12","word22","word32","word42"]},
        {name:"list4",words:["word1q","word2q","wordtttt3q","word4q","word2q","wordtttt3q","word4q","word2q","wordtttt3q","word4q","word2q","wordtttt3q","word4q"]},
    ]
    return (
        <div className={classes.wrapper}>
            <Header className={classes.header} />
            <div className={classes.bodycontainer} >
                <SideBar className={classes.sidebar} lists={lists} />
                <Application className={classes.content} />
            </div>

        </div>
    );
}

export default App;
