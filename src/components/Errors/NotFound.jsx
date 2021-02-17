import React from 'react';
import s from './NotFound.module.css';

const NotFound = () => {
    return <div className={s.error_block}>
    <h1 className={s.error_number}>404</h1>
        <p className={s.error_subtitle}>Page not found</p>
    </div>
}

export default NotFound;