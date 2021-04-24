/* Users */
export const saveLoggedUser = (user) => ({
    type: 'LOGIN_USER',
    data: {
        loggedUser: user
    }
});
/* Article */

export const saveArticleType = (articleType) => ({
    type: 'SAVE_ARTICLE_TYPE',
    data: {articleType: articleType}
});
export const saveArticleId = (articleId) => ({
    type: 'SAVE_ARTICLE_ID',
    data: {articleId: articleId}
});

/* Book section */
export const saveBookSectionTitle = (bookSectionTitle) => ({
    type: 'SAVE_BOOK_SECTION_TITLE',
    data: {
        bookSectionTitle: bookSectionTitle
    }
})
export const saveBookSectionPublicationPlace = (bookSectionPublicationPlace) => ({
    type: 'SAVE_BOOK_SECTION_PUBLICATION_PLACE',
    data: {bookSectionPublicationPlace: bookSectionPublicationPlace}
});
export const saveBookSectionPublisher = (bookSectionPublisher) => ({
    type: 'SAVE_BOOK_SECTION_PUBLISHER',
    data: {
        bookSectionPublisher: bookSectionPublisher
    }
});
export const saveBookSectionPageNumber = (bookSectionPageNumber) => ({
    type: 'SAVE_BOOK_SECTION_PAGE_NUMBER',
    data: {
        bookSectionPageNumber: bookSectionPageNumber
    }
});
export const saveBookSectionSeriesName = (bookSectionSeriesName) => ({
    type: 'SAVE_BOOK_SECTION_SERIES_NAME',
    data: {
        bookSectionSeriesName: bookSectionSeriesName
    }
});
export const saveBookSectionISBN = (bookSectionISBN) => ({
    type: 'SAVE_BOOK_SECTION_ISBN',
    data: {
        bookSectionISBN: bookSectionISBN
    }
});
export const saveBookSectionVolume = (bookSectionVolume) => ({
    type: 'SAVE_BOOK_SECTION_VOLUME',
    data: {
        bookSectionVolume: bookSectionVolume
    }
});
export const saveBookSectionNumber = (bookSectionNumber) => ({
    type: 'SAVE_BOOK_SECTION_NUMBER',
    data: {
        bookSectionNumber: bookSectionNumber
    }
});
export const saveBookSectionFirstPage = (bookSectionFirstPage) => ({
    type: 'SAVE_BOOK_SECTION_FIRST_PAGE',
    data: {bookSectionFirstPage: bookSectionFirstPage}
});
export const saveBookSectionEndPage = (bookSectionEndPage) => ({
    type: 'SAVE_BOOK_SECTION_END_PAGE',
    data: {bookSectionEndPage: bookSectionEndPage}
});
/* Technical Report */
export const saveInstitution = (institution) => ({
    type: 'SAVE_INSTITUTION',
    data: {institution: institution}
});
export const saveMonographType = (monographType) => ({
    type: 'SAVE_MONOGRAPH_TYPE',
    data: {monographType: monographType}
});
export const savePublicationDepartment = (publicationDepartment) => ({
    type: 'SAVE_PUBLICATION_DEPARTMENT',
    data: {publicationDepartment: publicationDepartment}
});
/*Conference */
export const savePresentationType = (presentationType) => ({
    type: 'SAVE_PRESENTATION_TYPE',
    data: {presentationType: presentationType}
});
/*Thesis */
export const saveThesisType = (thesisType) => ({
    type: 'SAVE_THESIS_TYPE',
    data: {thesisType: thesisType}
});

/*publication */
export const savePublicationTitle = (publicationTitle) => ({
    type: 'SAVE_PUBLICATION_TITLE',
    data: {publicationTitle: publicationTitle}
});
export const savePublicationAbstract = (publicationAbstract) => ({
    type: 'SAVE_PUBLICATION_ABSTRACT',
    data: {publicationAbstract: publicationAbstract}
});
export const savePublicationCreators = (creators) => ({
    type: 'SAVE_PUBLICATION_CREATORS',
    data: {creators: creators}
});
export const savePublicationEditors = (editors) => ({
    type: 'SAVE_PUBLICATION_EDITORS',
    data: {editors: editors}
});
export const savePublicationCorporateCreators = (corporateCreators) => ({
    type: 'SAVE_PUBLICATION_CORPORATE_CREATORS',
    data: {corporateCreators: corporateCreators}
});
export const savePublicationRelatedURL = (relatedURLs) => ({
    type: 'SAVE_PUBLICATION_RELATED_URL',
    data: {relatedURLs: relatedURLs}
});
export const savePublicationFunders = (funders) => ({
    type: 'SAVE_PUBLICATION_FUNDERS',
    data: {funders: funders}
});
export const savePublicationProjects = (projects) => ({
    type: 'SAVE_PUBLICATION_PROJECTS',
    data: {projects: projects}
});

export const savePublicationStatus = (selectedStatus) => ({
    type: 'SAVE_PUBLICATION_STATUS',
    data: {selectedStatus: selectedStatus}
});
export const savePublicationKind = (kind) => ({
    type: 'SAVE_PUBLICATION_KIND',
    data: {kind: kind}
});
export const savePublicationDateType = (selectedDateType) => ({
    type: 'SAVE_PUBLICATION_DATE_TYPE',
    data: {selectedDateType: selectedDateType}
});
export const savePublicationRefereed = (selectedRefereed) => ({
    type: 'SAVE_PUBLICATION_REFEREED',
    data: {selectedRefereed: selectedRefereed}
});
export const savePublicationDate = (selectedDate) => ({
    type: 'SAVE_PUBLICATION_DATE',
    data: {selectedDate: selectedDate}
});
export const savePublicationId = (publicationId) => ({
    type: 'SAVE_PUBLICATION_ID',
    data: {publicationId: publicationId}
});
export const savePublicationURL = (publicationURL) => ({
    type: 'SAVE_PUBLICATION_URL',
    data: {publicationURL: publicationURL}
});
export const savePublicationEmailAddress = (emailAddress) => ({
    type: 'SAVE_PUBLICATION_EMAIL_ADDRESS',
    data: {emailAddress: emailAddress}
});
export const savePublicationReferences = (references) => ({
    type: 'SAVE_PUBLICATION_REFERENCES',
    data: {references: references}
});
export const savePublicationUnKeyword = (unKeyword) => ({
    type: 'SAVE_PUBLICATION_UN_KEYWORD',
    data: {unKeyword: unKeyword}
});
export const savePublicationAddInformation = (addInformation) => ({
    type: 'SAVE_PUBLICATION_ADD_INFORMATION',
    data: {addInformation: addInformation}
});
export const savePublicationComment = (comment) => ({
    type: 'SAVE_PUBLICATION_COMMENT',
    data: {comment: comment}
});
export const savePublicationSubjects = (subjects) => ({
    type: 'SAVE_PUBLICATION_SUBJECTS',
    data: {subjects: subjects}
});
export const savePublicationDivisions = (divisions) => ({
    type: 'SAVE_PUBLICATION_DIVISIONS',
    data: {divisions: divisions}
});
export const savePatentApplicant = (patentApplicant) => ({
    type: 'SAVE_PUBLICATION_PATENT_APPLICANT',
    data: {patentApplicant: patentApplicant}
});
export const saveMediaOutput = (mediaOutput) => ({
    type: 'SAVE_PUBLICATION_MEDIA_OUTPUT',
    data: {mediaOutput: mediaOutput}
});
export const saveCopyrightHolder = (copyrightHolder) => ({
    type: 'SAVE_PUBLICATION_COPYRIGHT_HOLDER',
    data: {copyrightHolder: copyrightHolder}
});
export const setDashboardState = (isAddingPublication) => ({
    type: 'SET_DASHBOARD_STATE',
    data: {isAddingPublication: isAddingPublication}
});
export const saveDisplayingPublicationLabel = (displayingPublicationLabel) => ({
    type: 'SAVE_DISPLAYING_PUBLICATION_LABEL',
    data: {displayingPublicationLabel: displayingPublicationLabel}
});
export const saveViewingPublicationId = (viewingPublicationId) => ({
    type: 'SAVE_VIEWING_PUBLICATION_ID',
    data: {viewingPublicationId: viewingPublicationId}
});
export const saveSearchPublicationContent = (searchPublicationContent) => ({
    type: 'SAVE_SEARCH_CONTENT',
    data: {searchPublicationContent: searchPublicationContent}
});

export const resetPublication = () => ({
    type: 'RESET_PUBLICATION',
});
export const resetTechnicalReport = () => ({
    type: 'RESET_TECHNICAL_REPORT',
});
export const resetConference = () => ({
    type: 'RESET_CONFERENCE',
});
export const resetBookSection = () => ({
    type: 'RESET_ BOOK_SECTION',
});
export const resetArticle = () => ({
    type: 'RESET_ARTICLE_REPORT',
});
export const disableAllElements = (isDisable) => ({
    type: 'DISABLE_ALL_ELEMENTS',
    data: {isDisable: isDisable}
});
export const savePublicationApproval = (approval) => ({
    type: 'SAVE_PUBLICATION_APPROVAL',
    data: {publicationApproval: approval}
});
export const savePublicationStatisticByYears = (statisticsByYears) => ({
    type: 'SAVE_STATISTIC_BY_YEARS',
    data: {statisticsByYears: statisticsByYears}
});
export const savePublicationSortBy = (sortBy) => ({
    type: 'SAVE_PUBLICATION_SORT_BY',
    data: {sortBy: sortBy}
});

/* profile */
export const saveGivenName = (givenName) => ({
    type: 'SAVE_GIVEN_NAME',
    data: {givenName: givenName}
});
export const saveFamilyName = (familyName) => ({
    type: 'SAVE_FAMILY_NAME',
    data: {familyName: familyName}
});
export const saveEmail = (email) => ({
    type: 'SAVE_EMAIL',
    data: {email: email}
});
export const savePassword = (password) => ({
    type: 'SAVE_PASSWORD',
    data: {password: password}
});

export const saveAddress = (address) => ({
    type: 'SAVE_ADDRESS',
    data: {address: address}
});
export const saveDepartment = (department) => ({
    type: 'SAVE_DEPARTMENT',
    data: {department: department}
});
export const saveIsAdmin = (isAdmin) => ({
    type: 'SAVE_IS_ADMIN',
    data: {isAdmin: isAdmin}
});
export const saveUserDescription = (userDescription) => ({
    type: 'SAVE_USER_DESCRIPTION',
    data: {userDescription: userDescription}
});
export const saveOpeningProfileTab = (openingProfileTab) => ({
    type: 'SAVE_OPENING_PROFILE_TAB',
    data: {openingProfileTab: openingProfileTab}
});
export const resetUserInformation = () => ({
    type: 'RESET_USER_INFORMATION',
});

/* publication filters */
export const savePublicationFilterDivisions = (divisions) => ({
    type: 'SAVE_PUBLICATION_FILTER_DIVISIONS',
    data: {divisions: divisions}
});
export const savePublicationFilterYearFrom = (yearFrom) => ({
    type: 'SAVE_FILTER_YEAR_FROM',
    data: {yearFrom: yearFrom}
});
export const savePublicationFilterYearTo = (yearTo) => ({
    type: 'SAVE_FILTER_YEAR_TO',
    data: {yearTo: yearTo}
});
export const resetPublicationFilter = (userAllowedDivision) => ({
    type: 'RESET_PUBLICATION_FILTER',
    data: {userAllowedDivision: userAllowedDivision}
});
export const unSelectPublicationFilter = (userAllowedDivision) => ({
    type: 'UNSELECT_PUBLICATION_FILTER',
    data: {userAllowedDivision: userAllowedDivision}
});
export const setTriggerReloadAllPublication = (triggerReloadAllPublication) => ({
    type: 'TRIGGER_RELOAD_ALL_PUBLICATIONS',
    data: {triggerReloadAllPublication: triggerReloadAllPublication}
})

/* statistics */
export const setTriggerReloadAllStatistics = (triggerReloadAllStatistics) => ({
    type: 'TRIGGER_RELOAD_ALL_STATISTICS',
    data: {triggerReloadAllStatistics: triggerReloadAllStatistics}
})
export const saveStatisticsFilterDivisions = (divisions) => ({
    type: 'SAVE_STATISTIC_FILTER_DIVISIONS',
    data: {divisions: divisions}
});
export const resetStatisticFilter = (userAllowedDivision) => ({
    type: 'RESET_STATISTIC_FILTER',
    data: {userAllowedDivision: userAllowedDivision}
});
export const unSelectStatisticFilter = (userAllowedDivision) => ({
    type: 'UNSELECT_STATISTIC_FILTER',
    data: {userAllowedDivision: userAllowedDivision}
});

/* impact score */
export const saveImpactScoreOpeningPublicationDetails = (openingPublicationDetails) => ({
    type: 'IMPACT_SCORE_SAVE_OPENING_PUBLICATION_DETAILS',
    data: {openingPublicationDetails: openingPublicationDetails}
})
export const saveImpactScoreOpeningUserEmail = (openingUserEmail) => ({
    type: 'IMPACT_SCORE_SAVE_OPENING_USER_EMAIL',
    data: {openingUserEmail: openingUserEmail}
})
export const saveImpactScoreOpeningUserName = (openingUserName) => ({
    type: 'IMPACT_SCORE_SAVE_OPENING_USER_NAME',
    data: {openingUserName: openingUserName}
})
export const resetImpactScore = () => ({
    type: 'RESET_IMPACT_SCORE'
})
export const saveImpactScoreSearchPublicationContent = (searchPublicationContent) => ({
    type: 'IMPACT_SCORE_SAVE_SEARCH_CONTENT',
    data: {searchPublicationContent: searchPublicationContent}
});
export const saveImpactScoreUserSortBy = (userSortBy) => ({
    type: 'IMPACT_SCORE_SAVE_USER_SORT_BY',
    data: {userSortBy: userSortBy}
});
export const saveImpactScorePublicationDetailSortBy = (publicationDetailsSortBy) => ({
    type: 'IMPACT_SCORE_SAVE_PUBLICATION_DETAIL_SORT_BY',
    data: {publicationDetailsSortBy: publicationDetailsSortBy}
});
export const saveImpactScoreTriggerReloadAllPublication = (triggerReloadAllPublication) => ({
    type: 'IMPACT_SCORE_TRIGGER_RELOAD_ALL_PUBLICATION',
    data: {triggerReloadAllPublication: triggerReloadAllPublication}
});







