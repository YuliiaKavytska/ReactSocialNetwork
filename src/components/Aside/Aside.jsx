import React from "react";
import s from './Aside.module.css';
import {NavLink} from "react-router-dom";
import StoreContext from "../../StoreContext";

const Aside = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                console.log(store)
                const favUsers = store.getState().aside.favUsers;
                return (
                    <aside className={s.aside}>
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
                                    <p className={s.fav_title}>Favorite users:</p>
                                    <ul className={s.favorite}>
                                        {favUsers.map((item) => (
                                            <li className={s.fav_item}>
                                                <img
                                                    src="https://illustrators.ru/uploads/illustration/image/1137533/square_kotya.jpg"
                                                    alt=""/>
                                                <a>{item.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                );
            }}
        </StoreContext.Consumer>
    );
}

export default Aside;