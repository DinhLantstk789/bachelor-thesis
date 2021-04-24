import {saveImpactScoreOpeningPublicationDetails, saveImpactScoreOpeningUserEmail, saveImpactScoreOpeningUserScore, saveImpactScoreSearchPublicationContent, saveResearchHoursByYears} from "../actions";

const initialState = {
    openingPublicationDetails: false,
    searchPublicationContent: '',
    userSortBy: 'Recently Added',
    publicationDetailsSortBy: 'Recently Added',
    openingUserEmail: null,
    openingUserName: null,
    openingUserScore: null,
    triggerReloadAllPublication: false,
    researchHoursByYears: null
};

export default (state = initialState, action) => {
    if (action.type === 'IMPACT_SCORE_SAVE_OPENING_PUBLICATION_DETAILS') {
        const data = action.data;
        return {...state, openingPublicationDetails: data.openingPublicationDetails}
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
            userSortBy: 'Recently Added',
            publicationDetailsSortBy: 'Recently Added',
            openingUserEmail: null,
            openingUserName: null,
            openingUserScore: null,
            triggerReloadAllPublication: false,
            researchHoursByYears: null
        }
    }
    return state;
}