const initialState = {
    loggedUser: null
};

export default (state = initialState, action) => {
    if (action.type === 'LOGIN_USER') {
        const data = action.data;
        return {
            ...state,
            loggedUser: data.loggedUser
        }
    }
    return state;
}
