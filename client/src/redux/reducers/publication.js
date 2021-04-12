const initialState = {
    publicationTitle: '',
    publicationAbstract: '',
    creators: [{familyName: '', givenName: '', email: '', department: ''}],
    corporateCreators:[{corporateCreator:''}],
    editors: [{familyName: '', givenName: '', email: ''}],
    relatedURLs: [{URL: '', URLType: ''}],
    projects: [{projectName: ''}],
    funders: [{funder: ''}],
    selectedStatus: '',
    selectedDateType: '',
    selectedRefereed: '',
    selectedDate: '',
    publicationId: '',
    publicationURL: '',
    emailAddress: '',
    references: '',
    unKeyword: '',
    addInformation: '',
    comment: '',
    copyrightHolder: '',
    mediaOutput: '',
    patentApplicant: '',
    publicationDepartment: '',
    kind: '',
    isAddingPublication: false,
    isDisable:false,
    displayingPublicationLabel: 'My Publication',
    viewingPublicationId: null,
    isApprovedPublication:'approved',
    subjects: [{name: 'Aerospace Engineering', isEnable: false},
        {name: 'Communications', isEnable: false},
        {name: 'Electronics and Computer Engineering', isEnable: false},
        {name: 'Engineering Mechanics', isEnable: false},
        {name: 'Engineering Physics', isEnable: false},
        {name: 'ISI-indexed journals', isEnable: false},
        {name: 'Information Technology (IT)', isEnable: false},
        {name: 'Scopus-indexed journals', isEnable: false},
        {name: 'Transportation Technology', isEnable: false},
        {name: 'Civil Engineering', isEnable: false}],
    divisions: [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: false},
        {name: ' Department of Civil Engineering and Transportation (CET)', isEnable: false},
        {name: ' Center for Electronics and Telecommunications Research (CETR)', isEnable: false},
        {name: ' Faculty of Agriculture Technology (FAT)', isEnable: false},
        {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: false},
        {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: false},
        {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: false},
        {name: 'Faculty of Information Technology (FIT)', isEnable: false},
        {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: false},
        {name: 'School of Aerospace Engineering (SAE)', isEnable: false},
        {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: false}]

};

export default (state = initialState, action) => {
    if (action.type === 'SAVE_PUBLICATION_TITLE') {
        const data = action.data;
        return {
            ...state,
            publicationTitle: data.publicationTitle
        }
    }
    if (action.type === 'SAVE_PUBLICATION_ABSTRACT') {
        const data = action.data;
        return {
            ...state,
            publicationAbstract: data.publicationAbstract
        }
    }
    if (action.type === 'SAVE_PUBLICATION_CREATORS') {
        const data = action.data;
        return {
            ...state,
            creators: data.creators
        }
    }
    if (action.type === 'SAVE_PUBLICATION_EDITORS') {
        const data = action.data;
        return {
            ...state,
            editors: data.editors
        }
    }
    if (action.type === 'SAVE_PUBLICATION_CORPORATE_CREATORS') {
        const data = action.data;
        return {
            ...state,
            corporateCreators: data.corporateCreators
        }
    }
    if (action.type === 'SAVE_PUBLICATION_RELATED_URL') {
        const data = action.data;
        return {
            ...state,
            relatedURLs: data.relatedURLs
        }
    }
    if (action.type === 'SAVE_PUBLICATION_FUNDERS') {
        const data = action.data;
        return {
            ...state,
            funders: data.funders
        }
    }
    if (action.type === 'SAVE_PUBLICATION_PROJECTS') {
        const data = action.data;
        return {
            ...state,
            projects: data.projects
        }
    }
    if (action.type === 'SAVE_PUBLICATION_STATUS') {
        const data = action.data;
        return {
            ...state,
            selectedStatus: data.selectedStatus
        }
    }
    if (action.type === 'SAVE_PUBLICATION_KIND') {
        const data = action.data;
        return {
            ...state,
            kind: data.kind
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DATE_TYPE') {
        const data = action.data;
        return {
            ...state,
            selectedDateType: data.selectedDateType
        }
    }
    if (action.type === 'SAVE_PUBLICATION_REFEREED') {
        const data = action.data;
        return {
            ...state,
            selectedRefereed: data.selectedRefereed
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DATE') {
        const data = action.data;
        return {
            ...state,
            selectedDate: data.selectedDate
        }
    }
    if (action.type === 'SAVE_PUBLICATION_ID') {
        const data = action.data;
        return {
            ...state,
            publicationId: data.publicationId
        }
    }
    if (action.type === 'SAVE_PUBLICATION_URL') {
        const data = action.data;
        return {
            ...state,
            publicationURL: data.publicationURL
        }
    }
    if (action.type === 'SAVE_PUBLICATION_EMAIL_ADDRESS') {
        const data = action.data;
        return {
            ...state,
            emailAddress: data.emailAddress
        }
    }
    if (action.type === 'SAVE_PUBLICATION_REFERENCES') {
        const data = action.data;
        return {
            ...state,
            references: data.references
        }
    }
    if (action.type === 'SAVE_PUBLICATION_UN_KEYWORD') {
        const data = action.data;
        return {
            ...state,
            unKeyword: data.unKeyword
        }
    }
    if (action.type === 'SAVE_PUBLICATION_ADD_INFORMATION') {
        const data = action.data;
        return {
            ...state,
            addInformation: data.addInformation
        }
    }
    if (action.type === 'SAVE_PUBLICATION_COMMENT') {
        const data = action.data;
        return {
            ...state,
            comment: data.comment
        }
    }
    if (action.type === 'SAVE_PUBLICATION_SUBJECTS') {
        const data = action.data;
        return {
            ...state,
            subjects: data.subjects
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DIVISIONS') {
        const data = action.data;
        return {
            ...state,
            divisions: data.divisions
        }
    }
    if (action.type === 'SAVE_PUBLICATION_PATENT_APPLICANT') {
        const data = action.data;
        return {
            ...state,
            patentApplicant: data.patentApplicant
        }
    }
    if (action.type === 'SAVE_PUBLICATION_MEDIA_OUTPUT') {
        const data = action.data;
        return {
            ...state,
            mediaOutput: data.mediaOutput
        }
    }
    if (action.type === 'SAVE_PUBLICATION_COPYRIGHT_HOLDER') {
        const data = action.data;
        return {
            ...state,
            copyrightHolder: data.copyrightHolder
        }
    }
    if (action.type === 'SAVE_PUBLICATION_DEPARTMENT') {
        const data = action.data;
        return {
            ...state,
            publicationDepartment: data.publicationDepartment
        }
    }
    if (action.type === 'SET_DASHBOARD_STATE') {
        const data = action.data;
        return {
            ...state,
            isAddingPublication: data.isAddingPublication
        }
    }
    if (action.type === 'SAVE_DISPLAYING_PUBLICATION_LABEL') {
        const data = action.data;
        return {
            ...state,
            displayingPublicationLabel: data.displayingPublicationLabel
        }
    }
    if (action.type === 'SAVE_VIEWING_PUBLICATION_ID') {
        const data = action.data;
        return {
            ...state,
            viewingPublicationId: data.viewingPublicationId
        }
    }

    if (action.type === 'DISABLE_ALL_ELEMENTS') {
        const data = action.data;
        return {
            ...state,
            isDisable: data.isDisable
        }
    } if (action.type === 'PUBLICATION_APPROVING_CHECK') {
        const data = action.data;
        return {
            ...state,
            isApprovedPublication: data.isApprovedPublication
        }
    }
    if (action.type === 'RESET_PUBLICATION') {
        return {
            publicationTitle: '',
            publicationAbstract: '',
            creators: [{familyName: '', givenName: '', email: '', department: ''}],
            corporateCreators: [{corporateCreator: ''}],
            editors: [{familyName: '', givenName: '', email: ''}],
            relatedURLs: [{URL: '', URLType: ''}],
            projects: [{projectName: ''}],
            funders: [{funder: ''}],
            selectedStatus: '',
            selectedDateType: '',
            selectedRefereed: '',
            selectedDate: '',
            publicationId: '',
            publicationURL: '',
            emailAddress: '',
            references: '',
            unKeyword: '',
            addInformation: '',
            comment: '',
            copyrightHolder: '',
            mediaOutput: '',
            patentApplicant: '',
            publicationDepartment: '',
            subjects: [{name: 'Aerospace Engineering', isEnable: false},
                {name: 'Communications', isEnable: false},
                {name: 'Electronics and Computer Engineering', isEnable: false},
                {name: 'Engineering Mechanics', isEnable: false},
                {name: 'Engineering Physics', isEnable: false},
                {name: 'ISI-indexed journals', isEnable: false},
                {name: 'Information Technology (IT)', isEnable: false},
                {name: 'Scopus-indexed journals', isEnable: false},
                {name: 'Transportation Technology', isEnable: false},
                {name: 'Civil Engineering', isEnable: false}],
            divisions: [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: false},
                {name: ' Department of Civil Engineering and Transportation (CET)', isEnable: false},
                {name: ' Center for Electronics and Telecommunications Research (CETR)', isEnable: false},
                {name: ' Faculty of Agriculture Technology (FAT)', isEnable: false},
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

