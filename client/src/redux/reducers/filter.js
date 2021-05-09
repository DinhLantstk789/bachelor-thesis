import {getAllDivisions} from "../../utils/configs";

const initialState = {
    triggerReloadAllPublication: false,
    yearFrom: 2000,
    yearTo: 2021,
    divisions: getAllDivisions(true)
};

export default (state = initialState, action) => {
    if (action.type === 'TRIGGER_RELOAD_ALL_PUBLICATIONS') {
        const data = action.data;
        return {...state, triggerReloadAllPublication: data.triggerReloadAllPublication}
    }
    if (action.type === 'SAVE_FILTER_YEAR_FROM') {
        const data = action.data;
        return {...state, yearFrom: data.yearFrom}
    }
    if (action.type === 'SAVE_FILTER_YEAR_TO') {
        const data = action.data;
        return {...state, yearTo: data.yearTo}
    }
    if (action.type === 'SAVE_PUBLICATION_FILTER_DIVISIONS') {
        const data = action.data;
        return {...state, divisions: data.divisions}
    }
    if (action.type === 'RESET_PUBLICATION_FILTER') {
        const userAllowedDivision = action.data.userAllowedDivision;
        let newDivisions = getAllDivisions(true);
        if (userAllowedDivision) newDivisions = newDivisions.filter(value => userAllowedDivision.includes(value.name));
        return {
            triggerReloadAllPublication: false,
            yearFrom: 2000,
            yearTo: 2021,
            divisions: newDivisions
        }
    }
    if (action.type === 'UNSELECT_PUBLICATION_FILTER') {
        const userAllowedDivision = action.data.userAllowedDivision;
        let newDivisions = getAllDivisions(false);
        if (userAllowedDivision) newDivisions = newDivisions.filter(value => userAllowedDivision.includes(value.name));
        return {
            triggerReloadAllPublication: false,
            yearFrom: 2000,
            yearTo: 2021,
            divisions: newDivisions
        }
    }
    return state;
}