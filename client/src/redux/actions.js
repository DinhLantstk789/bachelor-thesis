/* Users */
export const saveLoggedUser = (user) => ({
    type: 'LOGIN_USER',
    data: {
        loggedUser: user
    }
});

/* Article */
export const saveArticleType = (articleType) => ({
    type: 'SAVE_ARTICLE_TYPE',
    data: {
        articleType: articleType
    }
});

/* Book section */
export const saveBookSectionTitle = (bookSectionTitle) => ({
    type: 'SAVE_BOOK_SECTION_TITLE',
    data: {
        bookSectionTitle: bookSectionTitle
    }
});
