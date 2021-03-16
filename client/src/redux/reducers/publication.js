const initialState = {
    publicationTitle: '',
    publicationAbstract: '',
    creators: [{familyName: '', givenName: '', email: '', department: ''}],
    corporateCreators:[{corporateCreator:''}],
    editors: [{familyName: '', givenName: '', email: ''}],
    relatedURLs:[{URL:'',URLType :''}],
    projects:[{projectName:''}],
    funders:[{funder:''}],
    selectedStatus: '',
    selectedDateType: '',
    selectedRefereed: '',
    selectedDate: '',
    publicationId: '',
    publicationURL: '',
    emailAddress:'',
    references:'',
    unKeyword:'',
    addInformation:'',
    comment:''


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
        console.log(data);
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
    return state;

}

