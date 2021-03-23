import {Component, Fragment} from 'react';
import {Badge, Col, FormCheckbox, Row} from "shards-react";
import axios from "axios";
import {connect} from "react-redux";
import {
    saveArticleType, saveBookSectionEndPage, saveBookSectionFirstPage, saveBookSectionISBN,
    saveBookSectionNumber, saveBookSectionPageNumber, saveBookSectionPublicationPlace, saveBookSectionPublisher,
    saveBookSectionSeriesName, saveBookSectionTitle, saveBookSectionVolume, saveCopyrightHolder, saveInstitution,
    saveMediaOutput, saveMonographType, savePatentApplicant, savePresentationType, savePublicationAbstract,
    savePublicationAddInformation, savePublicationComment, savePublicationCorporateCreators, savePublicationCreators,
    savePublicationDate, savePublicationDateType, savePublicationDepartment, savePublicationDivisions,
    savePublicationEditors, savePublicationEmailAddress, savePublicationFunders, savePublicationId,
    savePublicationKind, savePublicationProjects, savePublicationRefereed, savePublicationReferences,
    savePublicationRelatedURL, savePublicationStatus, savePublicationSubjects, savePublicationTitle,
    savePublicationUnKeyword, savePublicationURL, saveThesisType, setStateOfComponent
} from "../redux/actions";

class PublicationDetail extends Component {
    state = {
        isApproved: false
    }

    parseAuthors(creators) {
        let finalAuthors = '';
        creators.forEach(c => finalAuthors += c.givenName + ' ' + c.familyName + ', ');
        return finalAuthors.substring(0, finalAuthors.length - 2);
    }
    constructor(props) {
        super(props);
        this.state.isApproved = props.isApproved;
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.publicationId !== prevProps.publicationId) {
            const body = {
                id: this.props.publicationId,
                accessToken: this.props.loggedUser.accessToken,
            }
            axios.post('http://localhost:1234/article/view', body).then(res => {
                let status = res.data.status;
                if (status === 200) {
                    this.props.setStateOfComponent(true);
                    this.props.saveArticleType(res.data.publications[0].type);
                    this.props.savePublicationTitle(res.data.publications[0].title);
                    this.props.savePublicationCreators(res.data.publications[0].creators);
                    this.props.savePublicationAbstract(res.data.publications[0].publicationAbstract);
                    this.props.savePublicationCorporateCreators(res.data.publications[0].corporateCreators);
                    this.props.savePublicationDivisions(res.data.publications[0].divisions);
                    this.props.savePublicationStatus(res.data.publications[0].selectedStatus);
                    this.props.savePublicationKind(res.data.publications[0].kind);
                    this.props.savePublicationRefereed(res.data.publications[0].selectedRefereed);
                    this.props.saveBookSectionFirstPage(res.data.publications[0].bookSectionFirstPage);
                    this.props.saveBookSectionEndPage(res.data.publications[0].bookSectionEndPage);
                    this.props.saveBookSectionTitle(res.data.publications[0].bookSectionTitle);
                    this.props.saveBookSectionPublicationPlace(res.data.publications[0].bookSectionPublicationPlace);
                    this.props.saveBookSectionPublisher(res.data.publications[0].bookSectionPublisher);
                    this.props.saveBookSectionPageNumber(res.data.publications[0].bookSectionPageNumber);
                    this.props.saveBookSectionSeriesName(res.data.publications[0].bookSectionSeriesName);
                    this.props.saveBookSectionISBN(res.data.publications[0].bookSectionISBN);
                    this.props.saveBookSectionVolume(res.data.publications[0].bookSectionVolume);
                    this.props.saveBookSectionNumber(res.data.publications[0].bookSectionNumber);
                    this.props.savePublicationSubjects(res.data.publications[0].subjects);
                    this.props.savePublicationEditors(res.data.publications[0].editors);
                    this.props.savePublicationDateType(res.data.publications[0].selectedDateType);
                    this.props.savePublicationDate(res.data.publications[0].selectedDate);
                    this.props.savePublicationURL(res.data.publications[0].publicationURL);
                    this.props.savePublicationRelatedURL(res.data.publications[0].relatedURLs);
                    this.props.savePublicationFunders(res.data.publications[0].funders);
                    this.props.savePublicationProjects(res.data.publications[0].projects);
                    this.props.savePublicationEmailAddress(res.data.publications[0].emailAddress);
                    this.props.savePublicationReferences(res.data.publications[0].references);
                    this.props.savePublicationUnKeyword(res.data.publications[0].unKeyword);
                    this.props.savePublicationAddInformation(res.data.publications[0].addInformation);
                    this.props.savePublicationComment(res.data.publications[0].comment);
                    this.props.saveMonographType(res.data.publications[0].monographType);
                    this.props.savePresentationType(res.data.publications[0].presentationType);
                    this.props.saveThesisType(res.data.publications[0].thesisType);
                    this.props.saveInstitution(res.data.publications[0].institution);
                    this.props.savePatentApplicant(res.data.publications[0].patentApplicant);
                    this.props.saveMediaOutput(res.data.publications[0].mediaOutput);
                    this.props.saveCopyrightHolder(res.data.publications[0].copyrightHolder);
                    this.props.savePublicationDepartment(res.data.publications[0].publicationDepartment);
                } else {
                    console.log('error:', res.data.message)
                }
            })
        }

    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col md={8}>
                        <Row style={{marginLeft: 0}}>
                            <h6 onClick={() => {
                                this.componentDidUpdate(this.props.publicationId)
                            }}><Badge theme="primary" style={{marginRight: 8}}>
                                {this.props.type}
                            </Badge>{this.props.title}</h6>
                        </Row>
                        <Row style={{marginLeft: 0, marginTop: -10}}>
                            <p style={{fontSize: 14}}>{this.parseAuthors(this.props.authors)}</p>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                            <i style={{fontSize: 20}} className='fa fa-eye'/>
                            <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'/>
                            <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash'/>
                            <FormCheckbox toggle checked={this.state.isApproved} onChange={() => {
                                this.setState({
                                    isApproved: !this.state.isApproved
                                });
                            }}>
                            </FormCheckbox>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        loggedUser: store.user.loggedUser
    };
}
let mapDispatchToProps = {setStateOfComponent,saveArticleType,saveBookSectionTitle,saveBookSectionPublicationPlace,saveBookSectionPublisher,
   savePublicationCreators,saveBookSectionPageNumber,saveBookSectionSeriesName,saveBookSectionISBN,saveBookSectionVolume,
    saveBookSectionNumber,saveBookSectionFirstPage,
    saveBookSectionEndPage,saveInstitution,saveMonographType,savePublicationDepartment,savePresentationType,saveThesisType,
    savePublicationTitle,savePublicationAbstract,
    savePublicationEditors,savePublicationCorporateCreators,savePublicationRelatedURL,savePublicationFunders,
    savePublicationProjects,savePublicationStatus,
    savePublicationKind,savePublicationDateType,savePublicationRefereed,savePublicationDate,savePublicationId,savePublicationURL,
    savePublicationEmailAddress,savePublicationReferences,
    savePublicationUnKeyword, savePublicationAddInformation, savePublicationComment,savePublicationSubjects,savePublicationDivisions,
    savePatentApplicant,saveMediaOutput,saveCopyrightHolder,

};
export default connect(mapStateToProps, mapDispatchToProps)(PublicationDetail);
