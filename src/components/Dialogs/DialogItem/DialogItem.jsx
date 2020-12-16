import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let path = `/dialogs/${props.id}`;
    return (
        <div className={s.dialog}>
            <NavLink className={s.dialog_item} to={path} activeClassName={s.active}>
                <img src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png" alt=""/>
                <p>{props.name}</p>
            </NavLink>
        </div>
    );
}


export default Dialog;