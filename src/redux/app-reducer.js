import {setUserThunkCreator} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    // авторизируем пользователя. санка возвращает нам промис. мы его дожидаемся и ставим что мы авторизировали пользователя
    // посылаем запрос на аус ми
    let setUserPromise = dispatch(setUserThunkCreator());
    // наше приложение авторизировано, если у нас выполнились все пропимы
    Promise.all([setUserPromise])
        .then(() => {
        dispatch(initializedSuccess())
    });
}

export default appReducer;