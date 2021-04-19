const initialState = {
    triggerReloadAllPublication: false,
    yearFrom: 2000,
    yearTo: 2021,
    divisions: [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: true},
        {name: 'Department of Civil Engineering and Transportation (CET)', isEnable: true},
        {name: 'Center for Electronics and Telecommunications Research (CETR)', isEnable: true},
        {name: 'Faculty of Agriculture Technology (FAT)', isEnable: true},
        {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: true},
        {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: true},
        {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: true},
        {name: 'Faculty of Information Technology (FIT)', isEnable: true},
        {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: true},
        {name: 'School of Aerospace Engineering (SAE)', isEnable: true},
        {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: true}]
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
        return {
            triggerReloadAllPublication: false,
            yearFrom: 2000,
            yearTo: 2021,
            divisions: [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: true},
                {name: 'Department of Civil Engineering and Transportation (CET)', isEnable: true},
                {name: 'Center for Electronics and Telecommunications Research (CETR)', isEnable: true},
                {name: 'Faculty of Agriculture Technology (FAT)', isEnable: true},
                {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: true},
                {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: true},
                {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: true},
                {name: 'Faculty of Information Technology (FIT)', isEnable: true},
                {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: true},
                {name: 'School of Aerospace Engineering (SAE)', isEnable: true},
                {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: true}]
        }
    }
    if (action.type === 'UNSELECT_PUBLICATION_FILTER') {
        return {
            triggerReloadAllPublication: false,
            yearFrom: 2000,
            yearTo: 2021,
            divisions: [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: false},
                {name: 'Department of Civil Engineering and Transportation (CET)', isEnable: false},
                {name: 'Center for Electronics and Telecommunications Research (CETR)', isEnable: false},
                {name: 'Faculty of Agriculture Technology (FAT)', isEnable: false},
                {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: false},
                {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: false},
                {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: false},
                {name: 'Faculty of Information Technology (FIT)', isEnable: false},
                {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: false},
                {name: 'School of Aerospace Engineering (SAE)', isEnable: false},
                {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: false}]
        }
    }
    return state;
}