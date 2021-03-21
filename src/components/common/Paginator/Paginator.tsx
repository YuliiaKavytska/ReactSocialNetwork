import React, {useEffect, useState} from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

interface IProps {
    totalItemCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    updatePage: (i: number) => void
    isFetching?: boolean
}

const Paginator: React.FC<IProps> = ({totalItemCount, pageSize, currentPage, portionSize = 5, updatePage}) => {

    //всего количество страниц
    const pagesCount = Math.ceil(totalItemCount / pageSize);
    let pagination: Array<number> = []; // наша пагинация (вся)
    for (let i = 1; i <= pagesCount; i++) {
        pagination.push(i);
    }
    // порции пагинации. (на странице)
    const quantPortions = Math.ceil(pagesCount / portionSize);
    // на какой порции мы находимся
    const [portionNumber, setPortionNumber] = useState(1);
    // начало и конец порции (страничи пагинации)
    const startOfPortion = (portionNumber - 1) * portionSize + 1;
    const endOfPortion = portionSize * portionNumber;

    useEffect(() => {
        // изменяем на какой порции мы находимся, для этого текущую страницу делим на размер порций и получаем результат
        setPortionNumber(Math.ceil(currentPage/portionSize))
    }, [currentPage, portionSize])

    return <div className={s.pagination}>
        {/*если порция на которой мы находимся больше единицы значит добавляем кнопки на старт*/}
        {portionNumber > 1
        && <span onClick={() => { setPortionNumber( 1) }}
                 className={cn(s.page, s.selectedPage)}
        >Start</span>}
        {portionNumber > 1
        && <span onClick={() => { setPortionNumber(i => i - 1) }}
                 className={`${s.page} ${s.selectedPage}`}
        >Back</span>}
        {pagination
            // фильтруем наши страники и отображаем только те, которые больше старта и меньше конца
            .filter((item) => item >= startOfPortion && item <= endOfPortion)
            .map((i) => (
                <span key={i}
                      onClick={() => {
                          updatePage(i)
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