const initialState = {
    loggedUser: {
        id: null, email: null, name: null, accessToken: null
    }
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_LOGGED_USER') {
        const payload = action.payload;
        console.log('Stored into Redux', payload.loggedUser);
        return {
            ...state,
            loggedUser: payload.loggedUser
        }
    }
    return state;
}
