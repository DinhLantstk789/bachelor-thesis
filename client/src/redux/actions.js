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
})
export const saveBookSectionPublicationPlace = (bookSectionPublicationPlace) => ({
    type: 'SAVE_BOOK_SECTION_PUBLICATION_PLACE',
    data: {
        bookSectionPublicationPlace: bookSectionPublicationPlace
    }
});
export const saveBookSectionPublisher = (bookSectionPublisher) => ({
    type: 'SAVE_BOOK_SECTION_PUBLISHER',
    data: {
        bookSectionPublisher: bookSectionPublisher
    }
});
export const saveBookSectionPageNumber = (bookSectionPageNumber) => ({
    type: 'SAVE_BOOK_SECTION_PAGE_NUMBER',
    data: {
        bookSectionPageNumber: bookSectionPageNumber
    }
});
export const saveBookSectionSeriesName = (bookSectionSeriesName) => ({
    type: 'SAVE_BOOK_SECTION_SERIES_NAME',
    data: {
        bookSectionSeriesName: bookSectionSeriesName
    }
});
export const saveBookSectionISBN = (bookSectionISBN) => ({
    type: 'SAVE_BOOK_SECTION_ISBN',
    data: {
        bookSectionISBN: bookSectionISBN
    }
});
export const saveBookSectionVolume = (bookSectionVolume) => ({
    type: 'SAVE_BOOK_SECTION_VOLUME',
    data: {
        bookSectionVolume: bookSectionVolume
    }
});
export const saveBookSectionNumber = (bookSectionNumber) => ({
    type: 'SAVE_BOOK_SECTION_NUMBER',
    data: {
        bookSectionNumber: bookSectionNumber
    }
});
export const saveBookSectionFirstPage = (bookSectionFirstPage) => ({
    type: 'SAVE_BOOK_SECTION_FIRST_PAGE',
    data: {bookSectionFirstPage: bookSectionFirstPage}
});
export const saveBookSectionEndPage = (bookSectionEndPage) => ({
    type: 'SAVE_BOOK_SECTION_END_PAGE',
    data: {bookSectionEndPage: bookSectionEndPage}
});
/*publication */
export const savePublicationTitle = (publicationTitle) => ({
    type: 'SAVE_PUBLICATION_TITLE',
    data: {publicationTitle: publicationTitle}
});

