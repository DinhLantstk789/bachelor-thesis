export const saveLoggedUser = (user) => ({
    type: 'LOGIN_USER',
    data: {
        loggedUser: user
    }
});


export const saveArticleType = (articleType) => ({
    type: 'SAVE_ARTICLE_TYPE',
    data: {
        articleType: articleType
    }
});
