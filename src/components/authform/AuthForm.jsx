import React, {useState} from 'react';
import classes from "./styles.module.css";
import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";

const AuthForm = (props) => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    return (
        <div className={classes.container}>
            <div className={classes.authinput}>Login: <MyInput onChange={(event)=>{setLogin(event.target.value)}}/></div>
            <div className={classes.authinput}>Password: <MyInput type={"password"} onChange={(event)=>{setPass(event.target.value)}}/></div>
            <MyButton className={classes.btn} onClick={()=>{props.confirm({login:login,pass:pass})}} >Войти</MyButton>
        </div>
    );
};

export default AuthForm;