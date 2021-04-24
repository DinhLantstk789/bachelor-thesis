const initialState = {
    givenName: '',
    familyName: '',
    email: '',
    address: '',
    department: 'Faculty of Information Technology (FIT)',
    isAdmin: false,
    password: '',
    userDescription: '',
    openingProfileTab: false,
    academicTitle: 'None',
    managerTitle: 'None',
    unionTitle: 'None'
};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_FAMILY_NAME') {
        const data = action.data;
        return {...state, familyName: data.familyName}
    }
    if (action.type === 'SAVE_EMAIL') {
        const data = action.data;
        return {...state, email: data.email}
    }
    if (action.type === 'SAVE_ADDRESS') {
        const data = action.data;
        return {...state, address: data.address}
    }
    if (action.type === 'SAVE_DEPARTMENT') {
        const data = action.data;
        return {...state, department: data.department}
    }
    if (action.type === 'SAVE_IS_ADMIN') {
        const data = action.data;
        return {...state, isAdmin: data.isAdmin}
    }
    if (action.type === 'SAVE_USER_DESCRIPTION') {
        const data = action.data;
        return {...state, userDescription: data.userDescription}
    }
    if (action.type === 'SAVE_GIVEN_NAME') {
        const data = action.data;
        return {...state, givenName: data.givenName}
    }
    if (action.type === 'SAVE_PASSWORD') {
        const data = action.data;
        return {...state, password: data.password}
    }
    if (action.type === 'SAVE_ACADEMIC_TITLE') {
        const data = action.data;
        return {...state, academicTitle: data.academicTitle}
    }
    if (action.type === 'SAVE_MANAGER_TITLE') {
        const data = action.data;
        return {...state, managerTitle: data.managerTitle}
    }
    if (action.type === 'SAVE_UNION_TITLE') {
        const data = action.data;
        return {...state, unionTitle: data.unionTitle}
    }
    if (action.type === 'SAVE_OPENING_PROFILE_TAB') {
        const data = action.data;
        return {...state, openingProfileTab: data.openingProfileTab}
    }
    if (action.type === 'RESET_USER_INFORMATION') {
        return {
            ...state,
            givenName: '',
            familyName: '',
            email: '',
            address: '',
            department: 'Faculty of Information Technology (FIT)',
            password: '',
            isAdmin: false,
            userDescription: '',
            openingProfileTab: false,
            academicTitle: 'None',
            managerTitle: 'None',
            unionTitle: 'None'
        }
    }
    return state;
}