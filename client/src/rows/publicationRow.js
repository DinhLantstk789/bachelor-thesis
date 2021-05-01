import React, {Fragment, useEffect, useState} from 'react';
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
    savePublicationURL, saveRanking,
    saveThesisType,
    saveViewingPublicationId,
    setDashboardState
} from "../redux/actions";
import * as apiCalls from "../utils/apiCalls";
import {ClipLoader, ScaleLoader} from "react-spinners";
import {getAllDivisions, getAllSubjects} from "../utils/configs";


function parseAuthors(creators) {
    let finalAuthors = '';
    creators.forEach(c => finalAuthors += c.givenName + ' ' + c.familyName + ', ');
    return finalAuthors.substring(0, finalAuthors.length - 2);
}

export default function PublicationRow({isForImpactScore, impactScore, weighedImpactScore, triggerUpdateUI, type, title, authors, approved, publicationId, selectedDate}) {
    const [isClickingViewing, setIsClickingView] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isApproved, setIsApproved] = useState();
    const [tooltipId, setTooltipId] = useState("tt_" + publicationId);
    const [approvalOpen, setOpen] = useState(false);
    const [scoreOpen, setScoreOpen] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const impactScoreOpeningUserEmail = useSelector(store => store.impactScore.openingUserEmail);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsApproved(approved);
        setTooltipId("tt_" + publicationId);
    });

    let updateDbIntoRedux = (displayingPublicationLabel) => {
        setIsClickingView(true);
        apiCalls.viewPublication({id: publicationId}, (p) => {
            let corporateCreators = [], funders = [], projects = [];
            p.corporateCreators.forEach(c => corporateCreators.push({corporateCreator: c}));
            p.funders.forEach(f => funders.push({funder: f}));
            p.projects.forEach(p => projects.push({projectName: p}));
            let initialDivisions = getAllDivisions(false);
            p.divisions.forEach(d => {
                initialDivisions.map(item => {
                    if (item.name === d) item.isEnable = true;
                })
            });
            let initialSubjects = getAllSubjects(false);
            p.subjects.forEach(s => {
                initialSubjects.map(item => {
                    if (item.name === s) {
                        item.isEnable = true;
                    }
                })
            });
            dispatch(saveArticleId(publicationId));
            dispatch(saveArticleType(p.type));
            dispatch(savePublicationTitle(p.title));
            dispatch(savePublicationCreators(p.creators));
            dispatch(savePublicationAbstract(p.publicationAbstract));
            dispatch(savePublicationCorporateCreators(corporateCreators));
            dispatch(savePublicationDivisions(initialDivisions));
            dispatch(savePublicationStatus(p.selectedStatus));
            dispatch(savePublicationKind(p.kind));
            dispatch(savePublicationRefereed(p.selectedRefereed));
            dispatch(saveBookSectionFirstPage(p.bookSectionFirstPage));
            dispatch(saveBookSectionEndPage(p.bookSectionEndPage));
            dispatch(saveBookSectionTitle(p.bookSectionTitle));
            dispatch(saveBookSectionPublicationPlace(p.bookSectionPublicationPlace));
            dispatch(saveBookSectionPublisher(p.bookSectionPublisher));
            dispatch(saveBookSectionPageNumber(p.bookSectionPageNumber));
            dispatch(saveBookSectionSeriesName(p.bookSectionSeriesName));
            dispatch(saveBookSectionISBN(p.bookSectionISBN));
            dispatch(saveBookSectionVolume(p.bookSectionVolume));
            dispatch(saveBookSectionNumber(p.bookSectionNumber));
            dispatch(savePublicationSubjects(initialSubjects));
            dispatch(savePublicationEditors(p.editors));
            dispatch(savePublicationDateType(p.selectedDateType));
            dispatch(savePublicationDate(p.selectedDate));
            dispatch(savePublicationURL(p.publicationURL));
            // dispatch(savePublicationRelatedURL(publication.relatedURLs));
            dispatch(savePublicationFunders(funders));
            dispatch(savePublicationProjects(projects));
            dispatch(savePublicationEmailAddress(p.emailAddress));
            dispatch(savePublicationReferences(p.references));
            dispatch(savePublicationUnKeyword(p.unKeyword));
            dispatch(savePublicationAddInformation(p.addInformation));
            dispatch(savePublicationComment(p.comment));
            dispatch(saveMonographType(p.monographType));
            dispatch(savePresentationType(p.presentationType));
            dispatch(saveThesisType(p.thesisType));
            dispatch(saveInstitution(p.institution));
            dispatch(savePatentApplicant(p.patentApplicant));
            dispatch(saveMediaOutput(p.mediaOutput));
            dispatch(saveCopyrightHolder(p.copyrightHolder));
            dispatch(savePublicationDepartment(p.publicationDepartment));
            dispatch(savePublicationId(p.publicationId));
            dispatch(savePublicationApproval(p.isApproved));
            dispatch(saveRanking(p.ranking));
            dispatch(setDashboardState(true));
            dispatch(saveDisplayingPublicationLabel(displayingPublicationLabel));
        }, (message) => {
            alert(message);
        })
    }

    let isMainAuthor = () => {
        if (impactScoreOpeningUserEmail !== null) {
            for (let i = 0; i < authors.length; i++) {
                if (authors[i].email === impactScoreOpeningUserEmail) {
                    return i === 0 || i === authors.length - 1;
                }
            }
        }
        return false;
    }

    return (
        <Fragment>
            <Row>
                <Col style={{marginRight: 50}}>
                    <Row style={{marginLeft: 5}}>
                        <h6 style={{lineHeight: 2, cursor: 'pointer'}} onClick={() => {
                            if (!isForImpactScore) {
                                updateDbIntoRedux('Publication Details');
                                dispatch(disableAllElements(true));
                            }
                        }}>
                            <Badge theme="secondary" style={{marginRight: 8}}>{type}</Badge>
                            {title}
                        </h6>
                    </Row>
                    <Row style={{marginLeft: 5, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{parseAuthors(authors)} ({selectedDate.split('-')[0]})</p>
                    </Row>
                </Col>
                <div style={{marginRight: 20}}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        {isClickingViewing ? <div style={{marginTop: 4}}><ScaleLoader height={25} width={4} margin={3} color={'#5b6168'} loading/></div> :
                            <Row style={{marginRight: 0}}>
                                {isForImpactScore ? <div style={{textAlign: 'center', marginRight: 0}}>
                                    <Badge id={'score' + tooltipId} style={{paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7}} theme='secondary' pill>
                                        <span style={{fontSize: 15}}>{Math.round(weighedImpactScore)}</span>
                                    </Badge>
                                    <Tooltip
                                        open={scoreOpen} placement={'left'}
                                        target={"#score" + tooltipId}
                                        toggle={() => setScoreOpen(!scoreOpen)}>
                                        {isMainAuthor() ? 'Tác giả chính ' : 'Đồng tác giả '} được tính {Math.round(weighedImpactScore)} trên tổng số {Math.round(impactScore)} giờ quy đổi
                                    </Tooltip>
                                </div> : <i style={{fontSize: 20, marginLeft: 20, marginRight: 10, marginTop: 4, cursor: 'pointer'}} className='fa fa-edit' onClick={() => {
                                    dispatch(saveViewingPublicationId(publicationId));
                                    updateDbIntoRedux('Update Publication');
                                }}
                                />}
                                {loggedUser.isAdmin ? <span>&nbsp; &nbsp;</span> : !isForImpactScore ? <div style={{fontSize: 20, marginLeft: 10, marginRight: 20}}>
                                    {isDeleting ? <ClipLoader size={20} color={'#5a6169'} loading/> : <i className='fa fa-trash' style={{cursor: 'pointer'}} onClick={() => {
                                        setIsDeleting(true);
                                        apiCalls.deletePublication({publicationId: publicationId}, () => {
                                            setIsDeleting(false);
                                            triggerUpdateUI();
                                        }, (message) => {
                                            alert(message);
                                        })
                                    }}
                                    />}
                                </div> : <span style={{marginRight: 10}}/>}
                                <div>
                                    {isApproved === true ? <i style={{fontSize: 20, marginTop: 4}} className="fa fa-check" aria-hidden="true" id={tooltipId}/> :
                                        <i style={{fontSize: 20, marginTop: 4}} className="fa fa-clock" aria-hidden="true" id={tooltipId}/>}
                                    <Tooltip
                                        open={approvalOpen}
                                        target={"#" + tooltipId}
                                        toggle={() => setOpen(!approvalOpen)}>
                                        {isApproved === true ? '✌️ Bài báo đã được duyệt' : '🥺 Bài báo đang chờ duyệt'}
                                    </Tooltip>
                                </div>
                            </Row>
                        }
                    </Row>
                </div>
            </Row>
        </Fragment>
    )
}
