const initialState = {
    articleType: 'article'
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_ARTICLE_TYPE') {
        const data = action.data;
        return {...state, articleType: data.articleType}
    }
    if (action.type === 'RESET_ARTICLE_REPORT') {
        return initialState;
    }
    return state;
}