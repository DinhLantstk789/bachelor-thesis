export const savedLoggedUser = (loggedUser) => ({
    type: 'SAVE_LOGGED_USER',
    payload: {
        user: loggedUser
    }
});

export const saveArticleType = (articleType) => ({
    type: 'SAVE_ARTICLE_TYPE',
    data: {
        articleType: articleType
    }
});
