const initialState = {
    bookSectionTitle: '',
    bookSectionPublicationPlace: '',
    ranking: '',
    bookSectionPublisher: '',
    bookSectionPageNumber: '',
    bookSectionSeriesName: '',
    bookSectionISBN: '',
    bookSectionVolume: '',
    bookSectionNumber: '',
    bookSectionFirstPage: 0,
    bookSectionEndPage: 0
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_BOOK_SECTION_TITLE') {
        const data = action.data;
        return {...state, bookSectionTitle: data.bookSectionTitle}
    }
    if (action.type === 'SAVE_RANKING') {
        const data = action.data;
        return {...state, ranking: data.ranking}
    }
    if (action.type === 'SAVE_BOOK_SECTION_PUBLICATION_PLACE') {
        const data = action.data;
        return {
            ...state,
            bookSectionPublicationPlace: data.bookSectionPublicationPlace
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_PUBLISHER') {
        const data = action.data;
        return {
            ...state,
            bookSectionPublisher: data.bookSectionPublisher
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_PAGE_NUMBER') {
        const data = action.data;
        return {
            ...state,
            bookSectionPageNumber: data.bookSectionPageNumber
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_SERIES_NAME') {
        const data = action.data;
        return {
            ...state,
            bookSectionSeriesName: data.bookSectionSeriesName
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_ISBN') {
        const data = action.data;
        return {
            ...state,
            bookSectionISBN: data.bookSectionISBN
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_VOLUME') {
        const data = action.data;
        return {
            ...state,
            bookSectionVolume: data.bookSectionVolume
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_NUMBER') {
        const data = action.data;
        return {
            ...state,
            bookSectionNumber: data.bookSectionNumber
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_FIRST_PAGE') {
        const data = action.data;
        return {
            ...state,
            bookSectionFirstPage: data.bookSectionFirstPage
        }
    }
    if (action.type === 'SAVE_BOOK_SECTION_END_PAGE') {
        const data = action.data;
        return {
            ...state,
            bookSectionEndPage: data.bookSectionEndPage
        }
    }
    if (action.type === 'RESET_BOOK_SECTION') {
        return initialState;
    }
    return state;
}