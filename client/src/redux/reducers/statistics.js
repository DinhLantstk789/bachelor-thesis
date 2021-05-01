import {getAllDivisions} from "../../utils/configs";

const initialState = {
    triggerReloadAllStatistics: false,
    divisions: getAllDivisions(true),
};

export default (state = initialState, action) => {
    if (action.type === 'TRIGGER_RELOAD_ALL_STATISTICS') {
        const data = action.data;
        return {...state, triggerReloadAllStatistics: data.triggerReloadAllStatistics}
    }
    if (action.type === 'SAVE_STATISTIC_FILTER_DIVISIONS') {
        const data = action.data;
        return {...state, divisions: data.divisions}
    }
    if (action.type === 'RESET_STATISTIC_FILTER') {
        const userAllowedDivision = action.data.userAllowedDivision;
        let newDivisions = getAllDivisions(true);
        if (userAllowedDivision) newDivisions = newDivisions.filter(value => userAllowedDivision.includes(value.name));
        return {
            triggerReloadAllStatistics: false,
            divisions: newDivisions
        }
    }
    if (action.type === 'UNSELECT_STATISTIC_FILTER') {
        const userAllowedDivision = action.data.userAllowedDivision;
        let newDivisions = getAllDivisions(false);
        if (userAllowedDivision) newDivisions = newDivisions.filter(value => userAllowedDivision.includes(value.name));
        return {
            triggerReloadAllStatistics: false,
            divisions: newDivisions
        }
    }
    return state;
}