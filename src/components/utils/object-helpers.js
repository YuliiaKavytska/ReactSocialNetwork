
export const findUserChanger = (state, id, objPropName, newObjProps) => (
    state.users.map(u => u[objPropName] === id ? ({...u, ...newObjProps}) : u))