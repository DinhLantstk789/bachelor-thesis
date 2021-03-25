import {Component, Fragment} from 'react';
import {Badge, Col, FormCheckbox, Row} from "shards-react";
import axios from "axios";
import {
    isDisplayingPublication,
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
    savePublicationRelatedURL,
    savePublicationStatus,
    savePublicationSubjects,
    savePublicationTitle,
    savePublicationUnKeyword,
    savePublicationURL,
    saveThesisType,
    setDashboardState,
} from "../redux/actions";
import {connect} from "react-redux";


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

    render() {
        return (
            <Fragment>
                <Row>
                    <Col md={8}>
                        <Row style={{marginLeft: 0}}>
                            <h6 onClick={() => {
                                const body = {
                                    id: this.props.publicationId,
                                    accessToken: this.props.loggedUser.accessToken,
                                }
                                axios.post('http://localhost:1234/article/view', body).then(res => {
                                    let status = res.data.status;
                                    if (status === 200) {
                                        this.props.setDashboardState(true);
                                        this.props.isDisplayingPublication(true);
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
                                        this.props.saveArticleType(res.data.publications[0].type);
                                        this.props.savePublicationTitle(res.data.publications[0].title);
                                        this.props.savePublicationCreators(res.data.publications[0].creators);
                                        this.props.savePublicationAbstract(res.data.publications[0].publicationAbstract);
                                        this.props.savePublicationCorporateCreators(corporateCreators);
                                        this.props.savePublicationDivisions(initialDivisions);
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
                                        this.props.savePublicationSubjects(initialSubjects);
                                        this.props.savePublicationEditors(res.data.publications[0].editors);
                                        this.props.savePublicationDateType(res.data.publications[0].selectedDateType);
                                        this.props.savePublicationDate(res.data.publications[0].selectedDate);
                                        this.props.savePublicationURL(res.data.publications[0].publicationURL);
                                        // this.props.savePublicationRelatedURL(res.data.publications[0].relatedURLs);
                                        this.props.savePublicationFunders(funders);
                                        this.props.savePublicationProjects(projects);
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
                                        this.props.savePublicationId(res.data.publications[0].publicationId);
                                    } else {
                                        console.log('error:', res.data.message)
                                    }
                                })

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
                            <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'
                               onClick={() => {
                                   const body = {
                                       id: this.props.publicationId,
                                       accessToken: this.props.loggedUser.accessToken,
                                   }
                                   axios.post('http://localhost:1234/article/view', body).then(res => {
                                       let status = res.data.status;
                                       if (status === 200) {
                                           this.props.setDashboardState(true);
                                       } else {
                                           console.log('error:', res.data.message)
                                       }
                                   })

                               }}
                            />
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
let mapDispatchToProps = {
    setDashboardState,
    saveArticleType,
    saveBookSectionTitle,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    savePublicationCreators,
    saveBookSectionPageNumber,
    saveBookSectionSeriesName,
    saveBookSectionISBN,
    saveBookSectionVolume,
    saveBookSectionNumber,
    saveBookSectionFirstPage,
    saveBookSectionEndPage,
    saveInstitution,
    saveMonographType,
    savePublicationDepartment,
    savePresentationType,
    saveThesisType,
    savePublicationTitle,
    savePublicationAbstract,
    savePublicationEditors,
    savePublicationCorporateCreators,
    savePublicationRelatedURL,
    savePublicationFunders,
    savePublicationProjects,
    savePublicationStatus,
    savePublicationKind,
    savePublicationDateType,
    savePublicationRefereed,
    savePublicationDate, savePublicationId,
    savePublicationURL,
    savePublicationEmailAddress,
    savePublicationReferences,
    savePublicationUnKeyword,
    savePublicationAddInformation,
    savePublicationComment,
    savePublicationSubjects,
    savePublicationDivisions,
    savePatentApplicant,
    saveMediaOutput,
    saveCopyrightHolder,
    isDisplayingPublication
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicationDetail);
