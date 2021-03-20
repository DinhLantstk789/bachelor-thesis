const initialState = {
    isPresentationType:'',
    isThesisType:''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_PRESENTATION_TYPE') {
        const data = action.data;
        return {
            ...state,
            isPresentationType: data.isPresentationType
        }
    }
    if (action.type === 'SAVE_THESIS_TYPE') {
        const data = action.data;
        return {
            ...state,
            isThesisType: data.isThesisType
        }
    }
    return state;
}