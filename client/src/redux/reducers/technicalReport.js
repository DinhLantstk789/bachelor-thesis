const initialState = {
    institution: '',
    monographType:''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_INSTITUTION') {
        const data = action.data;
        return {...state, institution: data.institution}
    }
    if (action.type === 'SAVE_MONOGRAPH_TYPE') {
        const data = action.data;
        return {...state, monographType: data.monographType}
    }
    if (action.type === 'RESET_TECHNICAL_REPORT') {
        return initialState;
    }

    return state;
}