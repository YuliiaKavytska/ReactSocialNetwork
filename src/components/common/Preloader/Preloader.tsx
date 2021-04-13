import React from 'react';
import s from "./Preloader.module.css";

let Preloader: React.FC = () => {
    return <div
        className={`${s.fetching} ${s.fetching_true}`}>
        {/*className={props.isFetching ? `${s.fetching} ${s.fetching_true}` : `${s.fetching} ${s.fetching_false}`}>*/}
        <div className={s.atom}>
            <div className={s.electron}></div>
            <div className={s.electron}></div>
            <div className={s.electron}></div>
        </div>
    </div>;
}

export default Preloader;