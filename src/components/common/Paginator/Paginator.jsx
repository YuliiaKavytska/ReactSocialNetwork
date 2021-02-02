import React, {useEffect, useState} from 'react';
import s from './Paginator.module.css';

const Paginator = ({totalItemCount, pageSize, currentPage, porionSize = 6, ...props}) => {

    const pagesCount = Math.ceil(totalItemCount / pageSize);
    let pagination = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagination.push(i);
    }

    const quantPortions = Math.ceil(pagesCount / porionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const startOfPortion = (portionNumber - 1) * porionSize + 1;
    const endOfPortion = porionSize * portionNumber;

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage/porionSize))
    }, [currentPage, porionSize])

    return <div className={s.pagination}>
        {portionNumber > 1
        && <span onClick={() => { setPortionNumber( 1) }}
                 className={`${s.page} ${s.selectedPage}`}
        >Start</span>}
        {portionNumber > 1
        && <span onClick={() => { setPortionNumber(i => i - 1) }}
                 className={`${s.page} ${s.selectedPage}`}
        >Back</span>}
        {pagination
            .filter((item) => item >= startOfPortion && item <= endOfPortion)
            .map((i) => (
                <span key={i}
                      onClick={() => {
                          props.updatePage(i)
                      }}
                      className={i === currentPage
                          ? `${s.page} ${s.selectedPage}`
                          : s.page}
                >{i}</span>
            ))}
        {portionNumber < quantPortions
        && <span onClick={() => { setPortionNumber(i => i + 1) }}
                 className={`${s.page} ${s.selectedPage}`}
        >Next</span>}
        {portionNumber < quantPortions
        && <span onClick={() => { setPortionNumber(quantPortions) }}
                 className={`${s.page} ${s.selectedPage}`}
        >End</span>}
    </div>;
}

export default Paginator;