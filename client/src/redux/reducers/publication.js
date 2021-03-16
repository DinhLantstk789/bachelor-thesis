const initialState = {
    publicationTitle: '',
    publicationAbstract: '',
    creators: [{familyName: '', givenName: '', email: '', department: ''}],
    selectedStatus: '',
    selectedDateType: '',
    selectedRefereed: '',
    selectedDate: '',
    publicationId: '',
    publicationURL: ''

};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_PUBLICATION_TITLE') {
        const data = action.data;
        return {
            ...state,
            publicationTitle: data.publicationTitle
        }
    }
    if (action.type === 'SAVE_PUBLICATION_ABSTRACT') {
        const data = action.data;
        return {
            ...state,
            publicationAbstract: data.publicationAbstract
        }
    }
    if (action.type === 'SAVE_PUBLICATION_CREATORS') {
        const data = action.data;
        console.log(data);
        return {
            ...state,
            creators: data.creators
        }
    }
    if (action.type === 'SAVE_PUBLICATION_STATUS') {
        const data = action.data;
        return {
            ...state,
            selectedStatus: data.selectedStatus
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DATE_TYPE') {
        const data = action.data;
        return {
            ...state,
            selectedDateType: data.selectedDateType
        }
    }
    if (action.type === 'SAVE_PUBLICATION_REFEREED') {
        const data = action.data;
        return {
            ...state,
            selectedRefereed: data.selectedRefereed
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DATE') {
        const data = action.data;
        return {
            ...state,
            selectedDate: data.selectedDate
        }
    }
    if (action.type === 'SAVE_PUBLICATION_ID') {
        const data = action.data;
        return {
            ...state,
            publicationId: data.publicationId
        }
    }
    if (action.type === 'SAVE_PUBLICATION_URL') {
        const data = action.data;
        return {
            ...state,
            publicationURL: data.publicationURL
        }
    }
    return state;

}

