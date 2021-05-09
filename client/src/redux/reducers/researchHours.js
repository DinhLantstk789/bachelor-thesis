const initialState = {
    openingPublicationDetails: false,
    searchPublicationContent: '',
    userSortBy: 'Thêm gần đây',
    publicationDetailsSortBy: 'Thêm gần đây',
    openingUserEmail: null,
    openingUserName: null,
    openingUserThreshold: null,
    openingUserTotalHours: null,
    openingUserResearchHoursThreshold: null,
    openingUserScore: null,
    triggerReloadAllPublication: false,
    researchHoursByYears: null,
    userListSelectedYear: 2021
};

export default (state = initialState, action) => {
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_PUBLICATION_DETAILS') {
        const data = action.data;
        return {...state, openingPublicationDetails: data.openingPublicationDetails}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_USER_SELECTED_YEAR') {
        const data = action.data;
        return {...state, userListSelectedYear: data.userListSelectedYear}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_RESEARCH_HOURS_THRESHOLD') {
        const data = action.data;
        return {...state, openingUserResearchHoursThreshold: data.openingUserResearchHoursThreshold}
    }
    if (action.type === 'SAVE_RESEARCH_HOURS_BY_YEARS') {
        const data = action.data;
        return {...state, researchHoursByYears: data.researchHoursByYears}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_USER_SORT_BY') {
        const data = action.data;
        return {...state, userSortBy: data.userSortBy}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_PUBLICATION_DETAIL_SORT_BY') {
        const data = action.data;
        return {...state, publicationDetailsSortBy: data.publicationDetailsSortBy}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_SEARCH_CONTENT') {
        const data = action.data;
        return {...state, searchPublicationContent: data.searchPublicationContent}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_EMAIL') {
        const data = action.data;
        return {...state, openingUserEmail: data.openingUserEmail}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_NAME') {
        const data = action.data;
        return {...state, openingUserName: data.openingUserName}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_THRESHOLD') {
        const data = action.data;
        return {...state, openingUserThreshold: data.openingUserThreshold}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_TOTAL_HOURS') {
        const data = action.data;
        return {...state, openingUserTotalHours: data.openingUserTotalHours}
    }
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_USER_SCORE') {
        const data = action.data;
        return {...state, openingUserScore: data.openingUserScore}
    }
    if (action.type === 'IMPACT_SCORE_TRIGGER_RELOAD_ALL_PUBLICATION') {
        const data = action.data;
        return {...state, triggerReloadAllPublication: data.triggerReloadAllPublication}
    }
    if (action.type === 'RESET_IMPACT_SCORE') {
        return {
            openingPublicationDetails: false,
            searchPublicationContent: '',
            userSortBy: 'Thêm gần đây',
            publicationDetailsSortBy: 'Thêm gần đây',
            openingUserEmail: null,
            openingUserThreshold: null,
            openingUserTotalHours: null,
            openingUserResearchHoursThreshold: null,
            openingUserName: null,
            openingUserScore: null,
            triggerReloadAllPublication: false,
            researchHoursByYears: null,
            userListSelectedYear: 2021
        }
    }
    return state;
}