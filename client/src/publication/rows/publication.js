import {Fragment, useEffect, useState} from 'react';
import {Badge, Col, FormCheckbox, Row, Tooltip} from "shards-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    disableAllElements,
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
} from "../../redux/actions";

function parseAuthors(creators) {
    let finalAuthors = '';
    creators.forEach(c => finalAuthors += c.givenName + ' ' + c.familyName + ', ');
    return finalAuthors.substring(0, finalAuthors.length - 2);
}

export default function PublicationDetail({type, title, authors, approved, publicationId}) {
    const [isApproved, setIsApproved] = useState(false);
    const [tooltipId, setTooltipId] = useState("tt_" + publicationId);
    const [open, setOpen] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsApproved(approved);
        setTooltipId("tt_" + publicationId);
        console.log(type, title, authors, approved, publicationId, tooltipId);
    });

    let updateDbIntoRedux = (displayingPublicationLabel) => {
        const body = {
            id: publicationId,
            accessToken: loggedUser.accessToken,
        }
        axios.post('http://localhost:1234/article/view', body).then(res => {
            let status = res.data.status;
            if (status === 200) {
                dispatch(setDashboardState(true));
                dispatch(saveDisplayingPublicationLabel(displayingPublicationLabel));
                let corporateCreators = [], funders = [], projects = [];
                res.data.publications[0].corporateCreators.forEach(c => corporateCreators.push({corporateCreator: c}));
                res.data.publications[0].funders.forEach(f => funders.push({funder: f}));
                res.data.publications[0].projects.forEach(p => projects.push({projectName: p}));
                let initialDivisions = [{name: 'Advanced Institute of Engineering and Technology (AVITECH)', isEnable: false},
                    {name: ' Department of Civil Engineering and Transportation (CET)', isEnable: false},
                    {name: ' Center for Electronics and Telecommunications Research (CETR)', isEnable: false},
                    {name: ' Faculty of Agriculture Technology (FAT)', isEnable: false},
                    {name: 'Faculty of Electronics and Telecommunications (FET)', isEnable: false},
                    {name: 'Faculty of Engineering Mechanics and Automation (FEMA)', isEnable: false},
                    {name: 'Faculty of Engineering Physics and Nanotechnology (FEPN)', isEnable: false},
                    {name: 'Faculty of Information Technology (FIT)', isEnable: false},
                    {name: 'Key Laboratory for Nanotechnology (Nano Lab)', isEnable: false},
                    {name: 'School of Aerospace Engineering (SAE)', isEnable: false},
                    {name: 'Key Laboratory for Smart Integrated Systems (SISLAB)', isEnable: false}];
                console.log(res.data.publications[0].divisions);
                res.data.publications[0].divisions.forEach(d => {
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
                res.data.publications[0].subjects.forEach(s => {
                    initialSubjects.map(item => {
                        if (item.name === s) {
                            item.isEnable = true;
                        }
                    })
                });
                dispatch(saveArticleType(res.data.publications[0].type));
                dispatch(savePublicationTitle(res.data.publications[0].title));
                dispatch(savePublicationCreators(res.data.publications[0].creators));
                dispatch(savePublicationAbstract(res.data.publications[0].publicationAbstract));
                dispatch(savePublicationCorporateCreators(corporateCreators));
                dispatch(savePublicationDivisions(initialDivisions));
                dispatch(savePublicationStatus(res.data.publications[0].selectedStatus));
                dispatch(savePublicationKind(res.data.publications[0].kind));
                dispatch(savePublicationRefereed(res.data.publications[0].selectedRefereed));
                dispatch(saveBookSectionFirstPage(res.data.publications[0].bookSectionFirstPage));
                dispatch(saveBookSectionEndPage(res.data.publications[0].bookSectionEndPage));
                dispatch(saveBookSectionTitle(res.data.publications[0].bookSectionTitle));
                dispatch(saveBookSectionPublicationPlace(res.data.publications[0].bookSectionPublicationPlace));
                dispatch(saveBookSectionPublisher(res.data.publications[0].bookSectionPublisher));
                dispatch(saveBookSectionPageNumber(res.data.publications[0].bookSectionPageNumber));
                dispatch(saveBookSectionSeriesName(res.data.publications[0].bookSectionSeriesName));
                dispatch(saveBookSectionISBN(res.data.publications[0].bookSectionISBN));
                dispatch(saveBookSectionVolume(res.data.publications[0].bookSectionVolume));
                dispatch(saveBookSectionNumber(res.data.publications[0].bookSectionNumber));
                dispatch(savePublicationSubjects(initialSubjects));
                dispatch(savePublicationEditors(res.data.publications[0].editors));
                dispatch(savePublicationDateType(res.data.publications[0].selectedDateType));
                dispatch(savePublicationDate(res.data.publications[0].selectedDate));
                dispatch(savePublicationURL(res.data.publications[0].publicationURL));
                // dispatch(savePublicationRelatedURL(res.data.publications[0].relatedURLs));
                dispatch(savePublicationFunders(funders));
                dispatch(savePublicationProjects(projects));
                dispatch(savePublicationEmailAddress(res.data.publications[0].emailAddress));
                dispatch(savePublicationReferences(res.data.publications[0].references));
                dispatch(savePublicationUnKeyword(res.data.publications[0].unKeyword));
                dispatch(savePublicationAddInformation(res.data.publications[0].addInformation));
                dispatch(savePublicationComment(res.data.publications[0].comment));
                dispatch(saveMonographType(res.data.publications[0].monographType));
                dispatch(savePresentationType(res.data.publications[0].presentationType));
                dispatch(saveThesisType(res.data.publications[0].thesisType));
                dispatch(saveInstitution(res.data.publications[0].institution));
                dispatch(savePatentApplicant(res.data.publications[0].patentApplicant));
                dispatch(saveMediaOutput(res.data.publications[0].mediaOutput));
                dispatch(saveCopyrightHolder(res.data.publications[0].copyrightHolder));
                dispatch(savePublicationDepartment(res.data.publications[0].publicationDepartment));
                dispatch(savePublicationId(res.data.publications[0].publicationId));
            } else {
                console.log('error:', res.data.message)
            }
        })
    }
    return (
        <Fragment>
            <Row>
                <Col md={8}>
                    <Row style={{marginLeft: 0}}>
                        <h6 onClick={() => {
                            updateDbIntoRedux('Publication Details');
                            dispatch(disableAllElements(true));
                        }}><Badge theme="primary" style={{marginRight: 8}}>
                            {type}
                        </Badge>{title}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{parseAuthors(authors)}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'
                           onClick={() => {
                               dispatch(saveViewingPublicationId(publicationId));
                               updateDbIntoRedux('Update Publication');

                           }}
                        />
                        {loggedUser.isAdmin ? <span>&nbsp; &nbsp;</span> :
                            <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash'
                               onClick={async () => {
                                   const Api = axios.create(
                                       {
                                           baseURL: 'http://localhost:1234',
                                           headers: {
                                               Authorization: `${loggedUser.accessToken}`
                                           },
                                       }
                                   );
                                   await Api.delete(`/article/deletePublication/${publicationId}`).then(res => {
                                       let status = res.data.status;
                                       if (status === 300) {
                                           console.log('thu suong 123');

                                       } else {
                                           console.log('error');
                                       }
                                   });
                               }}
                            />

                        }

                        {loggedUser.isAdmin ? <FormCheckbox toggle checked={isApproved} onChange={() => {
                            setIsApproved(!isApproved);
                            const body = {id: publicationId};
                            axios.post('http://localhost:1234/article/toggleApproval', body).then(res => {
                                let status = res.data.status;
                                if (status === 200) {
                                    console.log(res.data.message);
                                } else {
                                    setIsApproved(!isApproved);
                                    console.log('error:', res.data.message)
                                }
                            })
                        }}/> : <div>
                            {isApproved === true ? <i style={{fontSize: 20}} className="fa fa-check" aria-hidden="true" id={tooltipId}/> :
                                <i style={{fontSize: 20}} className="fa fa-clock" aria-hidden="true" id={tooltipId}/>}
                            <Tooltip
                                open={open}
                                target={"#" + tooltipId}
                                toggle={() => setOpen(!open)}>
                                {isApproved === true ? '✌️ Woo! Publication is approved.' : '🥺 Publication is still being processed.'}
                            </Tooltip>
                        </div>
                        }
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}
