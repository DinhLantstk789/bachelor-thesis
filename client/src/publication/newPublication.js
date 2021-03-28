import {Component, Fragment} from 'react';
import {Button, FormInput, FormTextarea, Row} from "shards-react";
import ReferredArticle from "./sharedSections/referredArticle";
import RadioGroup from "../radioGroup";
import {connect} from "react-redux";
import Subject from "./sharedSections/subject";
import ArticleType from "./sharedSections/publicationType";
import axios from "axios";
import ContentLoader from "react-content-loader";
import DivisionSelector from "./sharedSections/divisionSelector";
import BookSectionMain from "./mainSections/bookSection";
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
    savePublicationURL,
    saveThesisType,
    saveViewingPublicationId,
    setDashboardState
} from "../redux/actions";
import Creator from "./sharedSections/creator";
import CorporateCreators from "./sharedSections/corporateCreators";
import RelatedURL from "./sharedSections/relatedURL";
import Funder from "./sharedSections/funder";
import Project from "./sharedSections/project";
import Editors from "./sharedSections/editors";
import ArticleMain from "./mainSections/article";
import TechnicalReport from "./mainSections/technicalReport";
import BookMain from "./mainSections/book";

class NewPublication extends Component {
    state = {
        showEmailAddress: false,
        isComponentLoading: false,
        currentType: 'article',
        submissionProgress: 0 /* 0: pending, 1: submitting, 2: success, 3: failed */
    }

    onSampleClicked = () => {
        let requestConfigs = {
            headers: {
                token: this.state.loggedUser.accessToken
            }
        }
        axios.get('http://localhost:1234/article/fetch', requestConfigs).then(res => {
            let status = res.data.status;
            if (status === 0) {
                let articlesSample = '';
                articlesSample = res.data.articles[0]['name'] + ' ' + res.data.articles[1]['name'];
                this.setState({articles: articlesSample});
            } else {
                alert(res.data.message);
            }
        })
    }


    onclickSubmitted = (event) => {
        event.preventDefault();
        let isValid = this.validate();
        if (isValid) {
            this.setState({ErrorMessage: ""});
        }
    }

    render() {
        console.log(this.props.viewingPublicationId);
        let submitButtonText;
        let submitButtonIcon;
        switch (this.state.submissionProgress) {
            case 1:
                submitButtonText = 'Submitting';
                submitButtonIcon = 'fa fa-spinner';
                break;
            case 2:
                submitButtonText = 'Success';
                submitButtonIcon = 'fa fa-check';
                break;
            case 3:
                submitButtonText = 'Failed';
                submitButtonIcon = 'fa fa-exclamation-triangle';
                break;
            default:
                submitButtonText = this.props.displayingPublicationLabel === 'New Publication' ? 'Deposit' : (this.props.displayingPublicationLabel === 'Update Publication' ? 'Update' : '');
                submitButtonIcon = 'fa fa-paper-plane';
        }
        let mainComponent = null;
        let addComponent = null;
        let detailComponent = null;
        if (this.props.type !== this.state.currentType) {
            this.setState({currentType: this.props.type, isComponentLoading: true});
            setTimeout(() => {
                this.setState({isComponentLoading: false});
            }, 1000);
        }
        switch (this.props.type) {
            case 'article':
                mainComponent = <div>
                    <ReferredArticle/>
                    <ArticleMain/>
                </div>
                break;
            case 'book-section':
                mainComponent = <div>
                    <ReferredArticle/>
                    <BookSectionMain/>
                </div>
                detailComponent = <Editors/>
                break;
            case 'technical-report':
                mainComponent = <div>
                    <TechnicalReport/>
                </div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{display: "inline", marginRight: 20}}><i className='fa fa-star' style={{marginRight: 10}}/>Monograph Type</h6>
                    <RadioGroup selectedId={this.props.monographType} enableTooltip={false} inline={true} radioArray={[{
                        name: 'Technical Report', id: 'technical-reportMonoType',
                    }, {
                        name: 'Project Report', id: 'project-reportMonoType',
                    }, {
                        name: 'Documentation', id: 'documentationMonoType',
                    }, {
                        name: 'Manual', id: 'manualMonoType',
                    }, {
                        name: 'Working Paper', id: 'working-paperMonoType',
                    }, {
                        name: 'Discussion Paper', id: 'discussion-paperMonoType',
                    }, {
                        name: 'Other', id: 'otherMonoType',
                    }]} onSelected={(selectedId) => this.props.saveMonographType(selectedId)}/>
                </div>
                break;
            case 'conference-workshop-item':
                mainComponent = <div><ReferredArticle/></div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{marginRight: 38, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Presentation Type:</h6>
                    <RadioGroup selectedId={this.props.presentationType} enableTooltip={false} inline={true} radioArray={[{
                        name: 'Paper', id: 'paper',
                    }, {
                        name: 'Lecture', id: 'lecture',
                    }, {
                        name: 'Speech', id: 'speech',
                    }, {
                        name: 'Poster', id: 'poster',
                    }, {
                        name: 'Keynote', id: 'keynote',
                    }, {
                        name: 'Other', id: 'otherConference',
                    }]} onSelected={(selectedId) => this.props.savePresentationType(selectedId)}/>
                </div>
                break;
            case 'book':
                mainComponent = <div>
                    <ReferredArticle/>
                    <BookMain/>
                </div>
                break;
            case 'thesis':
                mainComponent = <div>
                    <FormInput placeholder="Enter Institution" style={{marginTop: 10}} value={this.props.institution} style={{marginTop: 10}} onChange={(e) => this.props.saveInstitution(e.target.value)}/>
                    <FormInput placeholder="Enter Department" style={{marginTop: 10}} value={this.props.publicationDepartment} style={{marginTop: 10}} onChange={(e) => this.props.savePublicationDepartment(e.target.value)}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={this.props.bookSectionPageNumber} style={{marginTop: 10}} onChange={(e) => this.props.saveBookSectionPageNumber(e.target.value)}/>
                </div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{marginTop: 10, marginRight: 20, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Thesis Type:</h6>
                    <RadioGroup selectedId={this.props.thesisType} enableTooltip={false} inline={true} radioArray={[{
                        name: 'Diploma', id: 'diploma',
                    }, {
                        name: 'Masters', id: 'masters',
                    }, {
                        name: 'Doctoral', id: 'doctoral',
                    }, {
                        name: 'Post-Doctoral', id: 'Post-Doctoral',
                    }, {
                        name: 'Other', id: 'otherThesis',
                    }]} onSelected={(selectedId) => this.props.saveThesisType(selectedId)}/>
                </div>
                break;
            case 'patent':
                mainComponent = <div>
                    <FormInput placeholder="Enter Patent Applicant" style={{marginTop: 10}} value={this.props.patentApplicant} style={{marginTop: 10}} onChange={(e) => this.props.savePatentApplicant(e.target.value)}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={this.props.bookSectionPageNumber} style={{marginTop: 10}} onChange={(e) => this.props.saveBookSectionPageNumber(e.target.value)}/>
                </div>
                break;
            case 'image':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={this.props.mediaOutput} style={{marginTop: 10}} onChange={(e) => this.props.saveMediaOutput(e.target.value)}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                </div>
                break;
            case 'video':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={this.props.mediaOutput} style={{marginTop: 10}} onChange={(e) => this.props.saveMediaOutput(e.target.value)}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                </div>
                break;
            case 'dataset':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}} value={this.props.mediaOutput} style={{marginTop: 10}} onChange={(e) => this.props.saveMediaOutput(e.target.value)}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                </div>
                break;
            case 'experiment':
                mainComponent = null;
                break;
            case 'teaching-resource':
                mainComponent = <div>
                    <FormInput placeholder="Copyright Holder" value={this.props.copyrightHolder} style={{marginTop: 10}} onChange={(e) => this.props.saveCopyrightHolder(e.target.value)}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                </div>
                break;
            case 'project-grant':
                mainComponent = <div>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}value={this.props.bookSectionPublicationPlace} onChange={(e) => this.props.saveBookSectionPublicationPlace(e.target.value)}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                </div>
                break;
        }
        let loadedComponent = <div>
            <FormInput placeholder="Title" style={{marginTop: 10}} value={this.props.publicationTitle} onChange={(e) => this.props.savePublicationTitle(e.target.value)}/>
            <FormTextarea placeholder="Abstract" style={{marginTop: 10,height:200}} value={this.props.publicationAbstract} onChange={(e) => this.props.savePublicationAbstract(e.target.value)}/>
            {addComponent}
            <div style={{marginTop:20,marginBottom:-20}}>
                <h6 style={{marginRight: 41, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Kind:</h6>
                <RadioGroup selectedId={this.props.kind} enableTooltip={false} inline={true} radioArray={[{
                    name: 'Domestic', id: 'domestic',
                }, {
                    name: 'International', id: 'international',
                }]} onSelected={(selectedId)=> this.props.savePublicationKind(selectedId)}/>
            </div>
            <Creator/>
            <CorporateCreators/>
            {detailComponent}
            <DivisionSelector/>
            <hr style={{marginTop: 22, marginBottom: 22}}/>
            <label style={{fontSize: 20, marginBottom: 20}}>Publication Details</label>
            <div>
                <h6 style={{marginRight: 41, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Status:</h6>
                <RadioGroup selectedId={this.props.selectedStatus} enableTooltip={false} inline={true} radioArray={[{
                    name: 'Published', id: 'published',
                }, {
                    name: 'In Press', id: 'inPress',
                }, {
                    name: 'Submitted', id: 'submitted',
                }, {
                    name: 'Unpublished', id: 'unPublished',
                }]} onSelected={(selectedId)=> this.props.savePublicationStatus(selectedId)}/>
            </div>
            {mainComponent}
            <div style={{marginTop: 10}}>
                <h6 style={{marginRight: 10, display: "inline", marginTop: 10}}><i className='fa fa-star' style={{marginRight: 10}}/>Date Type:</h6>
                <span style={{marginTop: 10}}>
                        <RadioGroup selectedId={this.props.selectedDateType} enableTooltip={false} inline={true} radioArray={[{
                            name: 'Unspecified', id: 'unSpecified',
                        }, {
                            name: 'Publication', id: 'publication',
                        }, {
                            name: 'Submission', id: 'submission',
                        }, {
                            name: 'Completion', id: 'completion',
                        }]} onSelected={(selectedId) => this.props.savePublicationDateType(selectedId)}/>
                        </span>
                <h6 style={{marginTop: 10, marginLeft: 20, marginRight: 20, display: "inline"}}>Date</h6>
                <FormInput placeholder="My form input" type="date" style={{width: 200, display: 'inline'}} value={this.props.selectedDate} onChange={(e) => {
                    this.props.savePublicationDate(e.target.value);
                }}/>
            </div>
            <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
            <FormInput placeholder="Identification Number" value={this.props.publicationId} onChange={(e) => this.props.savePublicationId(e.target.value)} style={{marginTop: 10}}/>
            <FormInput placeholder="Official URL" value={this.props.publicationURL} onChange={(e) => this.props.savePublicationURL(e.target.value)} style={{marginTop: 10}}/>
            <RelatedURL/>
            <hr style={{marginTop: 22, marginBottom: 22}}/>
            <Funder/>
            <Project/>
            <Row style={{marginTop: 20}}>
                <Button theme={this.state.showEmailAddress ? 'primary' : 'light'} pill onClick={() => {
                    this.setState({showEmailAddress: !this.state.showEmailAddress});
                }} style={{marginLeft: 10}}> Contact Email Address</Button>
                <Button theme={this.state.showReferences ? 'primary' : 'light'} pill onClick={() => {
                    this.setState({showReferences: !this.state.showReferences});
                }} style={{marginLeft: 10}}>References</Button>
                <Button theme={this.state.showUncontrolledKeyword ? 'primary' : 'light'} pill onClick={() => {
                    this.setState({showUncontrolledKeyword: !this.state.showUncontrolledKeyword});
                }} style={{marginLeft: 10}}>Uncontrolled Keywords</Button>
                <Button theme={this.state.showAddInformation ? 'primary' : 'light'} pill onClick={() => {
                    this.setState({showAddInformation: !this.state.showAddInformation});
                }} style={{marginLeft: 10}}>Additional Information</Button>
                <Button theme={this.state.showComment ? 'primary' : 'light'} pill onClick={() => {
                    this.setState({showComment: !this.state.showComment});
                }} style={{marginLeft: 10}}>Comments and Suggestions</Button>
            </Row>
            <div>
                <FormInput type="text" id="emailAddress" placeholder="Email Address" value={this.props.emailAddress} onChange={(e) => this.props.savePublicationEmailAddress(e.target.value)}
                           style={{marginTop: 10, display: this.state.showEmailAddress ? 'block' : 'none'}}/>
                <FormInput type="text" id="references" placeholder="References" value={this.props.references} onChange={(e) => this.props.savePublicationReferences(e.target.value)}
                           style={{marginTop: 10, display: this.state.showReferences ? 'block' : 'none'}}/>
                <FormInput type="text" id="unKeyword" placeholder="Uncontrolled Keywords" value={this.props.unKeyword} onChange={(e) => this.props.savePublicationUnKeyword(e.target.value)}
                           style={{marginTop: 10, display: this.state.showUncontrolledKeyword ? 'block' : 'none'}}/>
                <FormInput type="text" id="addInformation" placeholder="Additional Information"value={this.props.addInformation} onChange={(e) => this.props.savePublicationAddInformation(e.target.value)}
                           style={{marginTop: 10, display: this.state.showAddInformation ? 'block' : 'none'}}/>
                <FormTextarea type="text" id="comment" placeholder="Comments and Suggestions" value={this.props.comment} onChange={(e) => this.props.savePublicationComment(e.target.value)}
                              style={{marginTop: 10, display: this.state.showComment ? 'block' : 'none'}}/>
            </div>
            <Subject/>
            <Row className='float-right'>
                {this.props.displayingPublicationLabel === 'Publication Details' ? "":
                    <Button pill style={{marginTop: 20, marginRight: 20, fontSize: 18}} onClick={() => {
                        const body = {
                            databaseId: this.props.viewingPublicationId,
                            type: this.props.type,
                            title: this.props.publicationTitle,
                            publicationAbstract: this.props.publicationAbstract,
                            creators: this.props.creators,
                            corporateCreators: this.props.corporateCreators.map(cor => cor.corporateCreator),
                            divisions: this.props.divisions.filter(div => div.isEnable).map(div => div.name),
                            selectedStatus: this.props.selectedStatus,
                            kind:this.props.kind,
                            selectedRefereed: this.props.selectedRefereed,
                            bookSectionFirstPage: this.props.bookSectionFirstPage,
                            bookSectionEndPage: this.props.bookSectionEndPage,
                            bookSectionTitle: this.props.bookSectionTitle,
                            bookSectionPublicationPlace: this.props.bookSectionPublicationPlace,
                            bookSectionPublisher: this.props.bookSectionPublisher,
                            bookSectionPageNumber: this.props.bookSectionPageNumber === '' ? 0 : this.props.bookSectionPageNumber,
                            bookSectionSeriesName: this.props.bookSectionSeriesName,
                            bookSectionISBN: this.props.bookSectionISBN,
                            bookSectionVolume: this.props.bookSectionVolume === '' ? 0 : this.props.bookSectionVolume,
                            bookSectionNumber: this.props.bookSectionNumber === '' ? 0 : this.props.bookSectionNumber,
                            subjects: this.props.subjects.filter(sub => sub.isEnable).map(sub => sub.name),
                            editors: this.props.editors,
                            selectedDateType: this.props.selectedDateType,
                            selectedDate: this.props.selectedDate,
                            publicationId: this.props.publicationId,
                            publicationURL: this.props.publicationURL,
                            relatedURLs: this.props.relatedURLs,
                            funders: this.props.funders.map(f => f.funder),
                            projects: this.props.projects.map(p => p.projectName),
                            emailAddress: this.props.emailAddress,
                            references: this.props.references,
                            unKeyword: this.props.unKeyword,
                            addInformation: this.props.addInformation,
                            comment: this.props.comment,
                            monographType: this.props.monographType,
                            presentationType: this.props.presentationType,
                            thesisType: this.props.thesisType,
                            institution: this.props.institution,
                            patentApplicant: this.props.patentApplicant,
                            mediaOutput: this.props.mediaOutput,
                            copyrightHolder: this.props.copyrightHolder,
                            publicationDepartment: this.props.publicationDepartment
                        }
                        this.setState({submissionProgress: 1})
                        axios.post('http://localhost:1234/article/add', body).then(res => {
                            let status = res.data.status;
                            if (status === 200) {
                                this.setState({submissionProgress: 2});
                                setTimeout(() => {
                                    this.props.resetArticle();
                                    this.props.resetBookSection();
                                    this.props.resetConference();
                                    this.props.resetPublication();
                                    this.props.resetTechnicalReport();
                                    this.props.setDashboardState(false);
                                    this.props.saveDisplayingPublicationLabel('My Publication');
                                    this.props.saveViewingPublicationId(null);
                                }, 1000);
                            } else {
                                this.setState({submissionProgress: 3})
                                console.log('error:', res.data.message)
                            }
                        })
                    }}>{submitButtonText} &nbsp;<i className={submitButtonIcon}/></Button>
                }
            </Row>
        </div>
        return (
            <Fragment>
                <ArticleType/>
                <br/>
                {this.state.isComponentLoading ? <ContentLoader viewBox="0 0 400 160">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <rect x="0" y={5 + item * 16} rx="5" ry="5" width="400" height="6"/>
                    ))}
                </ContentLoader> : loadedComponent}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {
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
        kind:store.publication.kind,
        displayingPublicationLabel: store.publication.displayingPublicationLabel
    };
}
let mapDispatchToProps = {
    savePublicationTitle, savePublicationAbstract, saveBookSectionPublisher, savePublicationDepartment, saveBookSectionPageNumber,
    savePublicationStatus, savePublicationDateType, savePublicationDate, savePublicationId, savePublicationURL, saveBookSectionPublicationPlace,
    saveMonographType, savePresentationType, saveInstitution, saveThesisType, savePatentApplicant, saveMediaOutput, saveCopyrightHolder,
    savePublicationEmailAddress, savePublicationReferences, savePublicationUnKeyword, savePublicationAddInformation, savePublicationComment,
    resetPublication, resetTechnicalReport, resetConference, resetBookSection, resetArticle, savePublicationKind, setDashboardState,
    saveViewingPublicationId, saveDisplayingPublicationLabel
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPublication);