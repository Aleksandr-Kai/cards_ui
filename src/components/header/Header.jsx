import React, { useEffect, useState} from 'react';
import classes from "./styles.module.css";
import MyButton from "../ui/button/MyButton";
import AuthForm from "../authform/AuthForm";
import classNames from "classnames";

const Header = ({className, onAuth}) => {
    const [userName, setUserName] = useState("")

    const logout = () => {
        localStorage.removeItem("token")
        setUserName("")
        onAuth(false)
    }
    const login = (value)=>{
        fetch('http://localhost:3000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({login:value.login,password:value.pass})
        })
        .then((response) => response.json())
        .then(data=>{
            if(data.error) {
                alert(data.error);
                return;
            }
            localStorage.setItem("token", data.token)
            setUserName(value.login)
            onAuth(true);
        })
        .catch(err=>console.log(`Error: ${err.message}`))
    }
    return (
        <div className={classNames(classes.container,className)} >
            {Boolean(localStorage.token) ? <><MyButton onClick={logout} >Выйти</MyButton><h3>{userName}</h3></> : <AuthForm confirm={login} />}
        </div>
    );
};

export default Header;