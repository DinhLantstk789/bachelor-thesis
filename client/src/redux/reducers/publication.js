const initialState = {
    publicationTitle: ''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_PUBLICATION_TITLE') {
        const data = action.data;
        return {
            ...state,
            publicationTitle: data.publicationTitle
        }
    }
    return state;
}
