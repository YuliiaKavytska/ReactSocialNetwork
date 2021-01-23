import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header_wrapper}>
                <div className={s.logotype}>
                    <img className={s.logo}
                         src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667"
                         alt=""/>
                    <p className={s.logo_title}>Opportunity</p>
                </div>
                    {
                        props.isAuth ?
                            <div className={s.login_block}>
                                <p className={s.options} onClick={() => props.logoutThunkCreator()}>Logout</p>
                                <p className={s.options}>{props.login}</p>
                                <div className={s.avatar}>
                                    <img className={s.mini_avatar}
                                         src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667"
                                         alt=""/>
                                </div>
                            </div>
                            : <NavLink to={'/login'} className={s.options}>Login</NavLink>
                    }
            </div>
        </header>
    );
}

export default Header;