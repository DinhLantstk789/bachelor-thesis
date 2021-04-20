import {Fragment, useEffect, useState} from 'react';
import {Badge, Col, Row, Tooltip} from "shards-react";
import {useDispatch, useSelector} from "react-redux";

import {
    disableAllElements,
    saveArticleId,
    saveArticleType,
    saveBookSectionEndPage,
    saveBookSectionFirstPage,
    saveBookSectionISBN,
    saveBookSectionNumber,
    saveBookSectionPageNumber,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    saveBookSectionSeriesName,
    saveBookSectionTitle,
    saveBookSectionVolume,
    saveCopyrightHolder,
    saveDisplayingPublicationLabel,
    saveInstitution,
    saveMediaOutput,
    saveMonographType,
    savePatentApplicant,
    savePresentationType,
    savePublicationAbstract,
    savePublicationAddInformation,
    savePublicationApproval,
    savePublicationComment,
    savePublicationCorporateCreators,
    savePublicationCreators,
    savePublicationDate,
    savePublicationDateType,
    savePublicationDepartment,
    savePublicationDivisions,
    savePublicationEditors,
    savePublicationEmailAddress,
    savePublicationFunders,
    savePublicationId,
    savePublicationKind,
    savePublicationProjects,
    savePublicationRefereed,
    savePublicationReferences,
    savePublicationStatus,
    savePublicationSubjects,
    savePublicationTitle,
    savePublicationUnKeyword,
    savePublicationURL,
    saveThesisType,
    saveViewingPublicationId,
    setDashboardState
} from "../redux/actions";
import * as apiCalls from "../utils/apiCalls";


function parseAuthors(creators) {
    let finalAuthors = '';
    creators.forEach(c => finalAuthors += c.givenName + ' ' + c.familyName + ', ');
    return finalAuthors.substring(0, finalAuthors.length - 2);
}

export default function PublicationRow({triggerUpdateUI, type, title, authors, approved, publicationId, selectedDate}) {
    const [isApproved, setIsApproved] = useState();
    const [tooltipId, setTooltipId] = useState("tt_" + publicationId);
    const [open, setOpen] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsApproved(approved);
        setTooltipId("tt_" + publicationId);
    });

    let updateDbIntoRedux = (displayingPublicationLabel) => {
        dispatch(setDashboardState(true));
        dispatch(saveDisplayingPublicationLabel(displayingPublicationLabel));
        apiCalls.viewPublication( {id: publicationId}, (publication) => {
            let corporateCreators = [], funders = [], projects = [];
            publication.corporateCreators.forEach(c => corporateCreators.push({corporateCreator: c}));
            publication.funders.forEach(f => funders.push({funder: f}));
            publication.projects.forEach(p => projects.push({projectName: p}));
            let initialDivisions = [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: false},
                {name: 'Department of Civil Engineering and Transportation (CET)', isEnable: false},
                {name: 'Center for Electronics and Telecommunications Research (CETR)', isEnable: false},
                {name: 'Faculty of Agriculture Technology (FAT)', isEnable: false},
                {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: false},
                {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: false},
                {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: false},
                {name: 'Faculty of Information Technology (FIT)', isEnable: false},
                {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: false},
                {name: 'School of Aerospace Engineering (SAE)', isEnable: false},
                {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: false}];
            publication.divisions.forEach(d => {
                initialDivisions.map(item => {
                    if (item.name === d) {
                        item.isEnable = true;
                    }
                })
            });
            let initialSubjects = [{name: 'Aerospace Engineering', isEnable: false},
                {name: 'Communications', isEnable: false},
                {name: 'Electronics and Computer Engineering', isEnable: false},
                {name: 'Engineering Mechanics', isEnable: false},
                {name: 'Engineering Physics', isEnable: false},
                {name: 'ISI-indexed journals', isEnable: false},
                {name: 'Information Technology (IT)', isEnable: false},
                {name: 'Scopus-indexed journals', isEnable: false},
                {name: 'Transportation Technology', isEnable: false},
                {name: 'Civil Engineering', isEnable: false}];
            publication.subjects.forEach(s => {
                initialSubjects.map(item => {
                    if (item.name === s) {
                        item.isEnable = true;
                    }
                })
            });
            dispatch(saveArticleId(publicationId));
            dispatch(saveArticleType(publication.type));
            dispatch(savePublicationTitle(publication.title));
            dispatch(savePublicationCreators(publication.creators));
            dispatch(savePublicationAbstract(publication.publicationAbstract));
            dispatch(savePublicationCorporateCreators(corporateCreators));
            dispatch(savePublicationDivisions(initialDivisions));
            dispatch(savePublicationStatus(publication.selectedStatus));
            dispatch(savePublicationKind(publication.kind));
            dispatch(savePublicationRefereed(publication.selectedRefereed));
            dispatch(saveBookSectionFirstPage(publication.bookSectionFirstPage));
            dispatch(saveBookSectionEndPage(publication.bookSectionEndPage));
            dispatch(saveBookSectionTitle(publication.bookSectionTitle));
            dispatch(saveBookSectionPublicationPlace(publication.bookSectionPublicationPlace));
            dispatch(saveBookSectionPublisher(publication.bookSectionPublisher));
            dispatch(saveBookSectionPageNumber(publication.bookSectionPageNumber));
            dispatch(saveBookSectionSeriesName(publication.bookSectionSeriesName));
            dispatch(saveBookSectionISBN(publication.bookSectionISBN));
            dispatch(saveBookSectionVolume(publication.bookSectionVolume));
            dispatch(saveBookSectionNumber(publication.bookSectionNumber));
            dispatch(savePublicationSubjects(initialSubjects));
            dispatch(savePublicationEditors(publication.editors));
            dispatch(savePublicationDateType(publication.selectedDateType));
            dispatch(savePublicationDate(publication.selectedDate));
            dispatch(savePublicationURL(publication.publicationURL));
            // dispatch(savePublicationRelatedURL(publication.relatedURLs));
            dispatch(savePublicationFunders(funders));
            dispatch(savePublicationProjects(projects));
            dispatch(savePublicationEmailAddress(publication.emailAddress));
            dispatch(savePublicationReferences(publication.references));
            dispatch(savePublicationUnKeyword(publication.unKeyword));
            dispatch(savePublicationAddInformation(publication.addInformation));
            dispatch(savePublicationComment(publication.comment));
            dispatch(saveMonographType(publication.monographType));
            dispatch(savePresentationType(publication.presentationType));
            dispatch(saveThesisType(publication.thesisType));
            dispatch(saveInstitution(publication.institution));
            dispatch(savePatentApplicant(publication.patentApplicant));
            dispatch(saveMediaOutput(publication.mediaOutput));
            dispatch(saveCopyrightHolder(publication.copyrightHolder));
            dispatch(savePublicationDepartment(publication.publicationDepartment));
            dispatch(savePublicationId(publication.publicationId));
            dispatch(savePublicationApproval(publication.isApproved));
        }, (message) => {
            console.log('error:', message);
        })
    }

    return (
        <Fragment>
            <Row>
                <Col md={10}>
                    <Row style={{marginLeft: 0}}>
                        <h6 onClick={() => {
                            updateDbIntoRedux('Publication Details');
                            dispatch(disableAllElements(true));
                        }}><Badge theme="secondary" style={{marginRight: 8}}>
                            {type}
                        </Badge>{title}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{parseAuthors(authors)} ({selectedDate.split('-')[0]})</p>
                    </Row>
                </Col>
                <Col md={2}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20, marginLeft: 20, marginRight: 10, marginTop: 4}} className='fa fa-edit'
                           onClick={() => {
                               dispatch(saveViewingPublicationId(publicationId));
                               updateDbIntoRedux('Update Publication');
                           }}
                        />
                        {loggedUser.isAdmin ? <span>&nbsp; &nbsp;</span> :
                            <i style={{fontSize: 20, marginLeft: 20, marginRight: 20, marginTop: 4}} className='fa fa-trash'
                               onClick={() => {
                                   apiCalls.deletePublication({publicationId: publicationId}, () => {
                                       triggerUpdateUI();
                                   }, (message) => {
                                       console.log(message);
                                   })
                               }}
                            />
                        }
                        <div>
                            {isApproved === true ? <i style={{fontSize: 20, marginTop: 4}} className="fa fa-check" aria-hidden="true" id={tooltipId}/> :
                                <i style={{fontSize: 20, marginTop: 4}} className="fa fa-clock" aria-hidden="true" id={tooltipId}/>}
                            <Tooltip
                                open={open}
                                target={"#" + tooltipId}
                                toggle={() => setOpen(!open)}>
                                {isApproved === true ? '✌️ Woo! Publication is approved.' : '🥺 Publication is still being processed.'}
                            </Tooltip>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}
