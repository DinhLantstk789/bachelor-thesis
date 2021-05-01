const initialState = {
    yearsRange: [],
    windowHeight: 1000
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_YEARS_RANGE') {
        const data = action.data;
        return {...state, yearsRange: data.yearsRange}
    }
    if (action.type === 'SAVE_WINDOWS_HEIGHT') {
        const data = action.data;
        return {...state, windowHeight: data.windowHeight}
    }
    if (action.type === 'RESET_HOME_REDUX') {
        return {
            ...state,
            yearsRange: [],
            windowInnerHeight: 1000
        }
    }
    return state;
}