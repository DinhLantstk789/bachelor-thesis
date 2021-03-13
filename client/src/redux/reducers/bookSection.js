const initialState = {
    bookSectionTitle: ''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_BOOK_SECTION_TITLE') {
        const data = action.data;
        return {
            ...state,
            bookSectionTitle: data.bookSectionTitle
        }
    }
    return state;
}