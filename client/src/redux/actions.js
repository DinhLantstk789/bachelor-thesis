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
export const savePublicationAbstract = (publicationAbstract) => ({
    type: 'SAVE_PUBLICATION_ABSTRACT',
    data: {publicationAbstract: publicationAbstract}
});
export const savePublicationCreators = (creators) => ({
    type: 'SAVE_PUBLICATION_CREATORS',
    data: {creators: creators}
});
export const savePublicationStatus = (selectedStatus) => ({
    type: 'SAVE_PUBLICATION_STATUS',
    data: {selectedStatus: selectedStatus}
});
export const savePublicationDateType = (selectedDateType) => ({
    type: 'SAVE_PUBLICATION_DATE_TYPE',
    data: {selectedDateType: selectedDateType}
});
export const savePublicationRefereed = (selectedRefereed) => ({
    type: 'SAVE_PUBLICATION_REFEREED',
    data: {selectedRefereed: selectedRefereed}
});
export const savePublicationDate= (selectedDate) => ({
    type: 'SAVE_PUBLICATION_DATE',
    data: {selectedDate: selectedDate}
});
export const savePublicationId= (publicationId) => ({
    type: 'SAVE_PUBLICATION_ID',
    data: {publicationId: publicationId}
});
export const savePublicationURL= (publicationURL) => ({
    type: 'SAVE_PUBLICATION_URL',
    data: {publicationURL: publicationURL}
});







