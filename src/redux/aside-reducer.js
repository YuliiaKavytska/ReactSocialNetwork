let initialState = {
    favUsers: [
        {id: 1, name: 'Yuliia'},
        {id: 2, name: 'Nastya'},
        {id: 3, name: 'Sasha'}
    ]
}

const asideReducer = (state = initialState, action) => {
    return state;
}

export default asideReducer;