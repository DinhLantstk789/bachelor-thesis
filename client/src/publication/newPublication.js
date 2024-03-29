import React, {Fragment, useState} from 'react';
import {Button, Col, FormInput, FormSelect, FormTextarea, Modal, ModalBody, ModalHeader, Row} from "shards-react";
import ReferredArticle from "./sharedSections/referredArticle";
import RadioGroup from "../radioGroup";
import {useDispatch, useSelector} from "react-redux";
import Subject from "./sharedSections/subject";
import ArticleType from "./sharedSections/publicationType";
import ContentLoader from "react-content-loader";
import DivisionSelector from "./sharedSections/divisionSelector";
import BookSectionMain from "./mainSections/bookSection";
import Creator from "./sharedSections/creator";
import CorporateCreators from "./sharedSections/corporateCreators";
import RelatedURL from "./sharedSections/relatedURL";
import Funder from "./sharedSections/funder";
import Project from "./sharedSections/project";
import Editors from "./sharedSections/editors";
import ArticleMain from "./mainSections/article";
import TechnicalReport from "./mainSections/technicalReport";
import BookMain from "./mainSections/book";
import * as apiCalls from "../utils/apiCalls";
import {
    resetArticle,
    resetBookSection,
    resetConference,
    resetPublication,
    resetTechnicalReport,
    saveBookSectionPageNumber,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
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
    savePublicationDate,
    savePublicationDateType,
    savePublicationDepartment,
    savePublicationEmailAddress,
    savePublicationId,
    savePublicationKind,
    savePublicationReferences,
    savePublicationStatus,
    savePublicationTitle,
    savePublicationUnKeyword,
    savePublicationURL, saveRanking,
    saveThesisType,
    saveViewingPublicationId,
    setDashboardState
} from "../redux/actions";
import {ClipLoader} from "react-spinners";
import ConferenceMain from "./mainSections/conferenceMain";
import {publicationRankingToResearchHours} from "../utils/configs";

export default function NewPublication() {
    const {
        type, viewingPublicationId, publicationTitle, publicationAbstract, creators, corporateCreators, selectedStatus,
        subjects, editors, selectedDateType, selectedDate, publicationId, publicationURL, relatedURLs, funders, projects,
        emailAddress, references, unKeyword, addInformation, comment, divisions, selectedRefereed, bookSectionFirstPage,
        bookSectionEndPage, bookSectionTitle, bookSectionPublicationPlace, bookSectionPublisher, bookSectionPageNumber,
        bookSectionSeriesName, bookSectionISBN, bookSectionVolume, bookSectionNumber, monographType, presentationType,
        thesisType, institution, patentApplicant, mediaOutput, copyrightHolder,
        publicationDepartment, kind, displayingPublicationLabel, isDisable, ranking
    } = useSelector(store => ({
        type: store.article.articleType,
        viewingPublicationId: store.publication.viewingPublicationId,
        publicationTitle: store.publication.publicationTitle,
        publicationAbstract: store.publication.publicationAbstract,
        creators: store.publication.creators,
        corporateCreators: store.publication.corporateCreators,
        selectedStatus: store.publication.selectedStatus,
        subjects: store.publication.subjects,
        editors: store.publication.editors,
        selectedDateType: store.publication.selectedDateType,
        selectedDate: store.publication.selectedDate,
        publicationId: store.publication.publicationId,
        publicationURL: store.publication.publicationURL,
        relatedURLs: store.publication.relatedURLs,
        funders: store.publication.funders,
        projects: store.publication.projects,
        emailAddress: store.publication.emailAddress,
        references: store.publication.references,
        unKeyword: store.publication.unKeyword,
        addInformation: store.publication.addInformation,
        comment: store.publication.comment,
        divisions: store.publication.divisions,
        selectedRefereed: store.publication.selectedRefereed,
        bookSectionFirstPage: store.bookSection.bookSectionFirstPage,
        bookSectionEndPage: store.bookSection.bookSectionEndPage,
        bookSectionTitle: store.bookSection.bookSectionTitle,
        bookSectionPublicationPlace: store.bookSection.bookSectionPublicationPlace,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionPageNumber: store.bookSection.bookSectionPageNumber,
        bookSectionSeriesName: store.bookSection.bookSectionSeriesName,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
        monographType: store.technicalReport.monographType,
        presentationType: store.conference.presentationType,
        thesisType: store.conference.thesisType,
        institution: store.technicalReport.institution,
        patentApplicant: store.publication.patentApplicant,
        mediaOutput: store.publication.mediaOutput,
        copyrightHolder: store.publication.copyrightHolder,
        publicationDepartment: store.publication.publicationDepartment,
        kind: store.publication.kind,
        displayingPublicationLabel: store.publication.displayingPublicationLabel,
        isDisable: store.publication.isDisable,
        ranking: store.bookSection.ranking
    }))

    const [isComponentLoading, setIsComponentLoading] = useState(false);
    const [currentType, setCurrentType] = useState(null);
    const [submissionProgress, setSubmissionProgress] = useState(0);
    const [showEmailAddress, setShowEmailAddress] = useState(emailAddress !== '');
    const [showReferences, setShowReferences] = useState(references !== '');
    const [showUncontrolledKeyword, setShowUncontrolledKeyword] = useState(unKeyword !== '');
    const [showAddInformation, setShowAddInformation] = useState(addInformation !== '');
    const [showComment, setShowComment] = useState(comment !== '');
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    let submitButtonText;
    let submitButtonIcon;
    switch (submissionProgress) {
        case 1:
            submitButtonText = 'Xin đợi';
            submitButtonIcon = <ClipLoader size={15} color={'#ffffff'} loading/>;
            break;
        case 2:
            submitButtonText = 'Thành công';
            submitButtonIcon = <i className='fa fa-check'/>;
            break;
        case 3:
            submitButtonText = 'Lỗi hệ thống';
            submitButtonIcon = <i className='fa fa-exclamation-triangle'/>;
            break;
        default:
            submitButtonText = displayingPublicationLabel === 'New Publication' ? 'Xác nhận' : (displayingPublicationLabel === 'Update Publication' ? 'Cập nhật' : '');
            submitButtonIcon = <i className='fa fa-paper-plane'/>;
    }
    let mainComponent = null, addComponent = null, detailComponent = null;
    if (type !== currentType) {
        setCurrentType(type);
        setIsComponentLoading(true);
        setTimeout(() => {
            setIsComponentLoading(false)
        }, 1000);
    }
    switch (type) {
        case 'article':
            mainComponent = <div><ReferredArticle/><ArticleMain/></div>
            break;
        case 'conference-workshop-item':
            mainComponent = <div><ReferredArticle/><ConferenceMain/></div>
            addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                <h6 style={{marginRight: 38, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Presentation Type:</h6>
                <RadioGroup selectedId={presentationType} enableTooltip={false} inline={true} radioArray={[
                    {name: 'Paper', id: 'paper'},
                    {name: 'Lecture', id: 'lecture'},
                    {name: 'Speech', id: 'speech'},
                    {name: 'Poster', id: 'poster'},
                    {name: 'Keynote', id: 'keynote'},
                    {name: 'Other', id: 'otherConference'}
                ]} onSelected={(selectedId) => dispatch(savePresentationType(selectedId))}/>
            </div>
            break;
        case 'technical-report':
            mainComponent = <div><TechnicalReport/></div>
            addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                <h6 style={{display: "inline", marginRight: 20}}><i className='fa fa-star' style={{marginRight: 10}}/>Monograph Type</h6>
                <RadioGroup selectedId={monographType} enableTooltip={false} inline={true} radioArray={[
                    {name: 'Technical Report', id: 'technical-reportMonoType'},
                    {name: 'Project Report', id: 'project-reportMonoType'},
                    {name: 'Documentation', id: 'documentationMonoType'},
                    {name: 'Manual', id: 'manualMonoType'},
                    {name: 'Working Paper', id: 'working-paperMonoType'},
                    {name: 'Discussion Paper', id: 'discussion-paperMonoType'},
                    {name: 'Other', id: 'otherMonoType'}
                ]} onSelected={(selectedId) => dispatch(saveMonographType(selectedId))}/>
            </div>
            break;
        case 'book-section':
            mainComponent = <div><ReferredArticle/><BookSectionMain/></div>
            detailComponent = <Editors/>
            break;
        case 'book':
            mainComponent = <div><ReferredArticle/><BookMain/></div>
            break;
        case 'thesis':
            mainComponent = <div>
                <FormInput placeholder="Enter Institution" value={institution} style={{marginTop: 10}} onChange={(e) => dispatch(saveInstitution(e.target.value))}/>
                <FormInput placeholder="Enter Department" value={publicationDepartment} style={{marginTop: 10}} onChange={(e) => dispatch(savePublicationDepartment(e.target.value))}/>
                <FormInput placeholder="Enter Number of Pages" value={bookSectionPageNumber} style={{marginTop: 10}} onChange={(e) => dispatch(saveBookSectionPageNumber(e.target.value))}/>
            </div>
            addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                <h6 style={{marginTop: 10, marginRight: 20, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Thesis Type:</h6>
                <RadioGroup selectedId={thesisType} enableTooltip={false} inline={true} radioArray={[
                    {name: 'Diploma', id: 'diploma'},
                    {name: 'Masters', id: 'masters'},
                    {name: 'Doctoral', id: 'doctoral'},
                    {name: 'Post-Doctoral', id: 'Post-Doctoral'},
                    {name: 'Other', id: 'otherThesis'}
                ]} onSelected={(selectedId) => dispatch(saveThesisType(selectedId))}/>
            </div>
            break;
        case 'patent':
            mainComponent =
                <div>
                    <Row>
                        <Col style={{marginLeft: 0, marginRight: -10}}>
                            <FormInput placeholder="Enter Patent Applicant" value={patentApplicant} style={{marginTop: 10}} onChange={(e) => dispatch(savePatentApplicant(e.target.value))}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormSelect value={ranking} style={{marginTop: 10}} onChange={(e) => dispatch(saveRanking(e.target.value))}>
                                {Object.keys(publicationRankingToResearchHours['patent']).map(d => <option value={d}>{d}</option>)}
                            </FormSelect>
                        </Col>
                    </Row>
                    <FormInput placeholder="Enter Number of Pages" value={bookSectionPageNumber} style={{marginTop: 10}} onChange={(e) => dispatch(saveBookSectionPageNumber(e.target.value))}/>
                </div>
            break;
        case 'image':
            mainComponent =
                <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={mediaOutput} style={{marginTop: 10}} onChange={(e) => dispatch(saveMediaOutput(e.target.value))}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </div>
            break;
        case 'video':
            mainComponent =
                <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={mediaOutput} style={{marginTop: 10}} onChange={(e) => dispatch(saveMediaOutput(e.target.value))}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </div>
            break;
        case 'dataset':
            mainComponent =
                <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={mediaOutput} style={{marginTop: 10}} onChange={(e) => dispatch(saveMediaOutput(e.target.value))}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </div>
            break;
        case 'experiment':
            mainComponent = null;
            break;
        case 'teaching-resource':
            mainComponent =
                <div>
                    <FormInput placeholder="Copyright Holder" value={copyrightHolder} style={{marginTop: 10}} onChange={(e) => dispatch(saveCopyrightHolder(e.target.value))}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </div>
            break;
        case 'project-grant':
            mainComponent =
                <div>
                    <Row style={{marginTop: 10}}>
                        <Col style={{marginLeft: 0, marginRight: -10}}>
                            <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}} value={bookSectionPublicationPlace} onChange={(e) => dispatch(saveBookSectionPublicationPlace(e.target.value))}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormSelect value={ranking} style={{marginTop: 10}} onChange={(e) => dispatch(saveRanking(e.target.value))}>
                                {Object.keys(publicationRankingToResearchHours['project-grant']).map(d => <option value={d}>{d}</option>)}
                            </FormSelect>
                        </Col>
                    </Row>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </div>
            break;
    }
    let loadedComponent = <div>
        <FormInput placeholder="Title" style={{marginTop: 10}} value={publicationTitle} onChange={(e) => dispatch(savePublicationTitle(e.target.value))}/>
        <FormTextarea placeholder="Abstract" style={{marginTop: 10, height: 200}} value={publicationAbstract} onChange={(e) => dispatch(savePublicationAbstract(e.target.value))}/>
        {addComponent}
        <div style={{marginTop: 20, marginBottom: -20}}>
            <h6 style={{marginRight: 41, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Kind:</h6>
            <RadioGroup selectedId={kind} enableTooltip={false} inline={true} radioArray={[
                {name: 'Domestic', id: 'domestic'}, {name: 'International', id: 'international'}
            ]} onSelected={(selectedId) => dispatch(savePublicationKind(selectedId))}/>
        </div>
        <Creator/>
        <CorporateCreators/>
        {detailComponent}
        <DivisionSelector pageBeingUsedOn='new-publication'/>
        <hr style={{marginTop: 22, marginBottom: 22}}/>
        <label style={{fontSize: 20, marginBottom: 20}}>Publication Details</label>
        <div>
            <h6 style={{marginRight: 41, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Status:</h6>
            <RadioGroup selectedId={selectedStatus} enableTooltip={false} inline={true} radioArray={[
                {name: 'Published', id: 'published'}, {name: 'In Press', id: 'inPress'},
                {name: 'Submitted', id: 'submitted'}, {name: 'Unpublished', id: 'unPublished'}
            ]} onSelected={(selectedId) => dispatch(savePublicationStatus(selectedId))}/>
        </div>
        {mainComponent}
        <div style={{marginTop: 10}}>
            <h6 style={{marginRight: 10, display: "inline", marginTop: 10}}><i className='fa fa-star' style={{marginRight: 10}}/>Date Type:</h6>
            <span style={{marginTop: 10}}>
                <RadioGroup selectedId={selectedDateType} enableTooltip={false} inline={true} radioArray={[
                    {name: 'Unspecified', id: 'unSpecified'}, {name: 'Publication', id: 'publication'},
                    {name: 'Submission', id: 'submission'}, {name: 'Completion', id: 'completion'}
                ]} onSelected={(selectedId) => dispatch(savePublicationDateType(selectedId))}/>
            </span>
            <h6 style={{marginTop: 10, marginLeft: 20, marginRight: 20, display: "inline"}}>Date</h6>
            <FormInput placeholder="My form input" type="date" style={{width: 200, display: 'inline'}} value={selectedDate} onChange={(e) => {
                dispatch(savePublicationDate(e.target.value));
            }}/>
        </div>
        <FormInput placeholder="Identification Number" value={publicationId} onChange={(e) => dispatch(savePublicationId(e.target.value))} style={{marginTop: 10}}/>
        <FormInput placeholder="Official URL" value={publicationURL} onChange={(e) => dispatch(savePublicationURL(e.target.value))} style={{marginTop: 10}}/>
        <RelatedURL/>
        <hr style={{marginTop: 22, marginBottom: 22}}/>
        <Funder/>
        <Project/>
        <Row style={{marginTop: 20, marginLeft: -10}}>
            <Button size='sm' theme={showEmailAddress ? 'primary' : 'light'} pill onClick={() => {
                setShowEmailAddress(!showEmailAddress)
            }} style={{marginLeft: 10}}> Contact Email Address &nbsp;<i className='fa fa-plus'/></Button>
            <Button size='sm' theme={showReferences ? 'primary' : 'light'} pill onClick={() => {
                setShowReferences(!showReferences)
            }} style={{marginLeft: 10}}>References &nbsp;<i className='fa fa-plus'/></Button>
            <Button size='sm' theme={showUncontrolledKeyword ? 'primary' : 'light'} pill onClick={() => {
                setShowUncontrolledKeyword(!showUncontrolledKeyword)
            }} style={{marginLeft: 10}}>Uncontrolled Keywords &nbsp;<i className='fa fa-plus'/></Button>
            <Button size='sm' theme={showAddInformation ? 'primary' : 'light'} pill onClick={() => {
                setShowAddInformation(!showAddInformation)
            }} style={{marginLeft: 10}}>Additional Information &nbsp;<i className='fa fa-plus'/></Button>
            <Button size='sm' theme={showComment ? 'primary' : 'light'} pill onClick={() => {
                setShowComment(!showComment)
            }} style={{marginLeft: 10}}>Comments and Suggestions &nbsp;<i className='fa fa-plus'/></Button>
        </Row>
        <div style={{marginTop: 20}}>
            <FormInput type="text" id="emailAddress" placeholder="Email Address" value={emailAddress} onChange={(e) => dispatch(savePublicationEmailAddress(e.target.value))}
                       style={{marginTop: 10, display: showEmailAddress ? 'block' : 'none'}}/>
            <FormInput type="text" id="references" placeholder="References" value={references} onChange={(e) => dispatch(savePublicationReferences(e.target.value))}
                       style={{marginTop: 10, display: showReferences ? 'block' : 'none'}}/>
            <FormInput type="text" id="unKeyword" placeholder="Uncontrolled Keywords" value={unKeyword} onChange={(e) => dispatch(savePublicationUnKeyword(e.target.value))}
                       style={{marginTop: 10, display: showUncontrolledKeyword ? 'block' : 'none'}}/>
            <FormInput type="text" id="addInformation" placeholder="Additional Information" value={addInformation} onChange={(e) => dispatch(savePublicationAddInformation(e.target.value))}
                       style={{marginTop: 10, display: showAddInformation ? 'block' : 'none'}}/>
            <FormTextarea type="text" id="comment" placeholder="Comments and Suggestions" value={comment} onChange={(e) => dispatch(savePublicationComment(e.target.value))}
                          style={{marginTop: 10, height: 100, display: showComment ? 'block' : 'none'}}/>
        </div>
        <Row className='float-right'>
            <Col>
                <Subject/>
            </Col>
            {displayingPublicationLabel === 'Publication Details' ? "" :
                <div>
                    <Button pill style={{marginTop: 65, marginRight: 20, fontSize: 18}} onClick={() => {
                        const body = {
                            databaseId: viewingPublicationId,
                            type: type,
                            title: publicationTitle,
                            publicationAbstract: publicationAbstract,
                            creators: creators,
                            corporateCreators: corporateCreators.map(cor => cor.corporateCreator),
                            divisions: divisions.filter(div => div.isEnable).map(div => div.name),
                            selectedStatus: selectedStatus,
                            kind: kind,
                            selectedRefereed: selectedRefereed,
                            bookSectionFirstPage: bookSectionFirstPage,
                            bookSectionEndPage: bookSectionEndPage,
                            bookSectionTitle: bookSectionTitle,
                            bookSectionPublicationPlace: bookSectionPublicationPlace,
                            bookSectionPublisher: bookSectionPublisher,
                            bookSectionPageNumber: bookSectionPageNumber === '' ? 0 : bookSectionPageNumber,
                            bookSectionSeriesName: bookSectionSeriesName,
                            bookSectionISBN: bookSectionISBN,
                            bookSectionVolume: bookSectionVolume === '' ? 0 : bookSectionVolume,
                            bookSectionNumber: bookSectionNumber === '' ? 0 : bookSectionNumber,
                            subjects: subjects.filter(sub => sub.isEnable).map(sub => sub.name),
                            editors: editors,
                            selectedDateType: selectedDateType,
                            selectedDate: selectedDate,
                            publicationId: publicationId,
                            publicationURL: publicationURL,
                            relatedURLs: relatedURLs,
                            funders: funders.map(f => f.funder),
                            projects: projects.map(p => p.projectName),
                            emailAddress: emailAddress,
                            references: references,
                            unKeyword: unKeyword,
                            addInformation: addInformation,
                            comment: comment,
                            monographType: monographType,
                            presentationType: presentationType,
                            thesisType: thesisType,
                            institution: institution,
                            patentApplicant: patentApplicant,
                            mediaOutput: mediaOutput,
                            copyrightHolder: copyrightHolder,
                            publicationDepartment: publicationDepartment,
                            ranking: ranking
                        }
                        setSubmissionProgress(1);
                        apiCalls.addPublication(body, () => {
                            setSubmissionProgress(2);
                            setTimeout(() => {
                                dispatch(resetArticle());
                                dispatch(resetBookSection());
                                dispatch(resetConference());
                                dispatch(resetPublication());
                                dispatch(resetTechnicalReport());
                                dispatch(setDashboardState(false));
                                dispatch(saveDisplayingPublicationLabel('Publications'));
                                dispatch(saveViewingPublicationId(null));
                            }, 1000);
                        }, (error) => {
                            setSubmissionProgress(0);
                            if (error === 'Publication already exists') {
                                setModalOpen(true);
                            } else {
                                alert(error);
                            }
                        });
                    }}>{submitButtonText}&nbsp; {submitButtonIcon}
                    </Button>
                </div>
            }
        </Row>
    </div>
    return (
        <Fragment>
            <Modal open={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader>Duplicated publication!</ModalHeader>
                <ModalBody><label style={{textAlign: 'center'}}>
                    ⚠️ The publication you are about to add already exists. Please search and check it carefully before proceed
                </label></ModalBody>
            </Modal>
            <fieldset disabled={isDisable}>
                <ArticleType/>
                <br/>
                {isComponentLoading ? <ContentLoader viewBox="0 0 400 160">
                    {[...Array(10).keys()].map((item) => (<rect x="0" y={5 + item * 16} rx="5" ry="5" width="400" height="6"/>))}
                </ContentLoader> : loadedComponent}
            </fieldset>
        </Fragment>
    )
}