import React, {useState} from 'react';
import MyButton from "../button/MyButton";
import MyInput from "../input/MyInput";

const InputWithButton = ({children, confirm, type, className, ...props}) => {
    const [value, setValue] = useState('')
    return (
        <div className={className} >
            <MyInput type={type} style={{borderBottomRightRadius:0,borderTopRightRadius:0}} onKeyDown={(event)=>{if(event.code === 'Enter') confirm(value)}} onChange={(event) => {setValue(event.target.value)}}/>
            <MyButton {...props} style={{borderBottomLeftRadius:0,borderTopLeftRadius:0}} onClick={()=>{confirm(value)}} >{children}</MyButton>
        </div>
    );
};

export default InputWithButton;