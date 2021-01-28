export const getUsers = (state) => {
    return state.searchPage.users;
}
export const getPageSize = (state) => {
    return state.searchPage.pageSize;
}
export const getTotalUserCount = (state) => {
    return state.searchPage.totalUserCount;
}
export const getCurrentPage = (state) => {
    return state.searchPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.searchPage.isFetching;
}
export const getIsFollowing = (state) => {
    return state.searchPage.isFollowing;
}
