import React from 'react';
import s from './Paginator.module.css';

const Paginator = ({totalUserCount, pageSize, currentPage, ...props}) => {
    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pagination = [];

    for (let i = 1; i <= pagesCount; i++) {
        pagination.push(i);
    }

    return <div className={s.pagination}>
        {pagination.map((i) => (
            <span
                key={i}
                onClick={() => {props.updatePage(i)}}
                className={i === currentPage
                    ? `${s.page} ${s.selectedPage}`
                    : s.page}
            >{i}</span>
        ))}
    </div>;
}

export default Paginator;