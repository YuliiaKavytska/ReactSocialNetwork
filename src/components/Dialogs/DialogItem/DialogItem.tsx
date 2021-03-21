import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom"

interface IProps {
    id: number
    name: string
}

const Dialog: React.FC<IProps> = ({id, name}) => {
    let path = `/dialogs/${id}`
    return (
        <div className={s.dialog}>
            <NavLink className={s.dialog_item} to={path} activeClassName={s.active}>
                <img src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png" alt=""/>
                <p>{name}</p>
            </NavLink>
        </div>
    )
}


export default Dialog