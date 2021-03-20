const initialState = {
    institution: '',
    isMonographType:''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_INSTITUTION') {
        const data = action.data;
        return {
            ...state,
            institution: data.institution
        }
    }
    if (action.type === 'SAVE_MONOGRAPH_TYPE') {
        const data = action.data;
        return {
            ...state,
            isMonographType: data.isMonographType
        }
    }
    return state;
}