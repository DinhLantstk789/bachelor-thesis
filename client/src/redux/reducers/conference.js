const initialState = {
    presentationType:'',
    thesisType:''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_PRESENTATION_TYPE') {
        const data = action.data;
        return {
            ...state,
            presentationType: data.presentationType
        }
    }
    if (action.type === 'SAVE_THESIS_TYPE') {
        const data = action.data;
        return {
            ...state,
            thesisType: data.thesisType
        }
    }
    return state;
}