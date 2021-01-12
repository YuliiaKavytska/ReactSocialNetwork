import React from 'react';
import s from "../../Search/Search.module.css";

let Preloader = (props) => {
    return <div
        className={props.isFetching ? `${s.fetching} ${s.fetching_true}` : `${s.fetching} ${s.fetching_false}`}>
        <div className={s.atom}>
            <div className={s.electron}></div>
            <div className={s.electron}></div>
            <div className={s.electron}></div>
        </div>
    </div>;
}

export default Preloader;