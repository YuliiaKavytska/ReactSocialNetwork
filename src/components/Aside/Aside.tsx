import React from "react"
import s from './Aside.module.css'
import {NavLink} from "react-router-dom"
import img from '../../assets/images/photo.png'
import {UserType} from "../../types/types";

interface PropsAsideType {
    favUsers: Array<UserType>
}

const Aside: React.FC<PropsAsideType> = ({favUsers}) => {
    return <aside className={s.aside}>
        <nav className={s.nav}>
            <ul className={s.list}>
                <li className={s.item}>
                    <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to="/news" activeClassName={s.active}>News</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to='/search' activeClassName={s.active}>Search more</NavLink>
                </li>
                <li className={s.item}>
                    <p className={s.fav_title}>Favorite users:</p>
                    <ul className={s.favorite}>
                        {favUsers.map((item, index) => <FavUser key={index} item={item}/>)}
                    </ul>
                </li>

            </ul>
        </nav>
    </aside>
}

interface PropsFavUserType {
    item: UserType
}

const FavUser: React.FC<PropsFavUserType> = ({item}) => {
    return <li className={s.fav_item}>
        <a className={s.newUser} href={"/profile/" + item.id}>
            <img src={item.photos.small || img}/>
            <p>{item.name}</p>
        </a>
    </li>
}

export default Aside