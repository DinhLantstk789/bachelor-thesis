const initialState = {
    givenName: '',
    familyName: '',
    email: '',
    address: '',
    department: '',
    isAdmin: false,
    password: '',
    userDescription: ''
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_FAMILY_NAME') {
        const data = action.data;
        return {
            ...state,
            familyName: data.familyName
        }
    }
    if (action.type === 'SAVE_EMAIL') {
        const data = action.data;
        return {
            ...state,
            email: data.email
        }
    }
    if (action.type === 'SAVE_ADDRESS') {
        const data = action.data;
        return {
            ...state,
            address: data.address
        }
    }
    if (action.type === 'SAVE_DEPARTMENT') {
        const data = action.data;
        return {
            ...state,
            department: data.department
        }
    }
    if (action.type === 'SAVE_IS_ADMIN') {
        const data = action.data;
        return {
            ...state,
            isAdmin: data.isAdmin
        }
    }
    if (action.type === 'SAVE_USER_DESCRIPTION') {
        const data = action.data;
        return {
            ...state,
            userDescription: data.userDescription
        }
    }
    if (action.type === 'SAVE_GIVEN_NAME') {
        const data = action.data;
        return {
            ...state,
            givenName: data.givenName
        }
    }
    if (action.type === 'SAVE_PASSWORD') {
        const data = action.data;
        return {
            ...state,
            password: data.password
        }
    }

    if (action.type === 'RESET_USER_INFORMATION') {
        const data = action.data;
        return {
            ...state,
            givenName: '',
            familyName: '',
            email: '',
            address: '',
            department: '',
            role: '',
            userDescription: '',
            dashboardState: false
        }
    }
    return state;
}
