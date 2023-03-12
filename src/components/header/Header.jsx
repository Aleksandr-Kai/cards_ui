import React, { useState} from 'react';
import classes from "./styles.module.css";
import MyButton from "../ui/button/MyButton";
import AuthForm from "../authform/AuthForm";
import classNames from "classnames";

const Header = ({className}) => {
    const [state, setState] = useState(localStorage.token)

    const logout = () => {
        localStorage.removeItem("token")
        setState("")
    }
    const login = (value)=>{
        localStorage.setItem("token", JSON.stringify(value))
        setState(value.login)
    }
    return (
        <div className={classNames(classes.container,className)} >
            {Boolean(localStorage.token) ? <><MyButton onClick={logout} >Выйти</MyButton><h3>{state}</h3></> : <AuthForm confirm={login} />}
        </div>
    );
};

export default Header;