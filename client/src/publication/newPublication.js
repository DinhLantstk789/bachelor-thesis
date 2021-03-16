import {Component, Fragment} from 'react';
import {Button, Col, FormInput, FormTextarea, Row} from "shards-react";
import ReferredArticle from "./referredArticle";
import RadioGroup from "../radioGroup";
import {connect} from "react-redux";
import Subject from "./subject";
import ArticleType from "./publicationType";
import axios from "axios";
import ContentLoader from "react-content-loader";
import DivisionSelector from "./divisionSelector";
import BookSectionMain from "./bookSectionMain";
import {
    savePublicationAbstract, savePublicationAddInformation, savePublicationComment,
    savePublicationDate,
    savePublicationDateType,
    savePublicationEmailAddress,
    savePublicationId,
    savePublicationReferences,
    savePublicationStatus,
    savePublicationTitle,
    savePublicationUnKeyword,
    savePublicationURL
} from "../redux/actions";
import Creator from "./creator";
import CorporateCreators from "../corporateCreators";
import RelatedURL from "../relatedURL";
import Funder from "../funder";
import Project from "../project";
import Editors from "../editors";

class NewPublication extends Component {
    state = {
        corporateCreators: [{corporateCreator: ''}, {corporateCreator: ''}],
        editors: [{familyName: '', givenName: '', email: ''}],
        relatedURL: [{URL: '', URLType: ''}],
        funders: [{funder: ''}],
        projects: [{projectName: ''}],
        showEmailAddress: false,
        isComponentLoading: false,
        currentType: 'article'
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

    onAdd(stateName, newData) {
        let current = this.state[stateName];
        let newState = current.concat(newData);
        this.setState({[stateName]: newState});
    }

    onclickSubmitted = (event) => {
        event.preventDefault();
        let isValid = this.validate();
        if (isValid) {
            this.setState({ErrorMessage: ""});
        }
    }

    render() {
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
                    <FormInput type="text" placeholder="Enter Journal or Publication Title" style={{marginTop: 10}}/>
                    <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                    <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    <Row style={{marginTop: 10}}>
                        <Col style={{marginLeft: 0, marginRight: -10}}>
                            <FormInput type="text" placeholder="Enter ISSN"/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput type="text" placeholder="Enter Volume"/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormInput type="text" placeholder="Enter Number"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <h6 style={{marginLeft: 13, marginRight: 30, marginTop: 2, display: "inline"}}>Page Range</h6>
                        <FormInput type="number" size={"sm"} style={{width: 70}}/>
                        <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                        <FormInput type="number" size={"sm"} style={{width: 70}}/>
                    </Row>
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
                    <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                </div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{display: "inline", marginRight: 20}}><i className='fa fa-star' style={{marginRight: 10}}/>Monograph Type</h6>
                    <RadioGroup enableTooltip={false} inline={true} radioArray={[{
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
                    }]} onSelected={() => {
                    }}/>
                </div>
                break;
            case 'conference-workshop-item':
                mainComponent = <div><ReferredArticle/></div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{marginRight: 38, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Presentation Type:</h6>
                    <RadioGroup enableTooltip={false} inline={true} radioArray={[{
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
                    }]} onSelected={() => {
                    }}/>
                </div>
                break;
            case 'book':
                mainComponent = <div>
                    <ReferredArticle/>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Series Name" style={{marginTop: 10}}/>
                    <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                    <Row style={{marginTop: 10}}>
                        <Col style={{marginLeft: 0, marginRight: -10}}>
                            <FormInput type="text" placeholder="Enter ISBN" />
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput type="text" placeholder="Enter Volume"/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormInput type="text" placeholder="Enter Number"/>
                        </Col>
                    </Row>
                </div>
                break;
            case 'thesis':
                mainComponent = <div>
                    <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                </div>
                addComponent = <div style={{marginTop: 20, marginBottom: -10}}>
                    <h6 style={{marginTop: 10, marginRight: 20, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Thesis Type:</h6>
                    <RadioGroup enableTooltip={false} inline={true} radioArray={[{
                        name: 'Diploma', id: 'diploma',
                    }, {
                        name: 'Masters', id: 'masters',
                    }, {
                        name: 'Doctoral', id: 'doctoral',
                    }, {
                        name: 'Post-Doctoral', id: 'Post-Doctoral',
                    }, {
                        name: 'Other', id: 'otherThesis',
                    }]} onSelected={() => {
                    }}/>
                </div>
                break;
            case 'patent':
                mainComponent = <div>
                    <FormInput placeholder="Enter Patent Applicant" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                </div>
                break;
            case 'image':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                </div>
                break;
            case 'video':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                </div>
                break;
            case 'dataset':
                mainComponent = <div>
                    <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                </div>
                break;
            case 'experiment':
                mainComponent = null;
                break;
            case 'teaching-resource':
                mainComponent = <div>
                    <FormInput placeholder="Copyright Holder"/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                </div>
                break;
            case 'project-grant':
                mainComponent = <div>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                </div>
                break;
        }
        let loadedComponent = <div>
            <FormInput placeholder="Title" style={{marginTop: 10}} value={this.props.publicationTitle} onChange={(e) => this.props.savePublicationTitle(e.target.value)}/>
            <FormTextarea placeholder="Abstract" style={{marginTop: 10}} value={this.props.publicationAbstract} onChange={(e) => this.props.savePublicationAbstract(e.target.value)}/>
            {addComponent}
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
                <FormInput placeholder="My form input" type="date" style={{width: 200, display: 'inline'}} value={this.props.selectedDate} onChange={(e) => this.props.savePublicationDate(e.target.value)}/>
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
                <Button pill style={{marginTop: 20, marginRight: 20, fontSize: 18}}>Deposit &nbsp;<i className='fa fa-check'/></Button>
            </Row>
        </div>
        return (
            <Fragment>
                <form onSubmit={this.onclickSubmitted}>
                    <ArticleType/>
                    <br/>
                    {this.state.isComponentLoading ? <ContentLoader viewBox="0 0 400 160">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                            <rect x="0" y={5 + item * 16} rx="5" ry="5" width="400" height="6"/>
                        ))}
                    </ContentLoader> : loadedComponent}
                </form>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        type: store.article.articleType,
        publicationTitle: store.publication.publicationTitle,
        publicationAbstract: store.publication.publicationAbstract,
        selectedStatus:store.publication.selectedStatus,
        selectedDateType:store.publication.selectedDateType,
        selectedDate : store.publication.selectedDate,
        publicationId:store.publication.publicationId,
        publicationURL:store.publication.publicationURL,
        emailAddress:store.publication.emailAddress,
        references:store.publication.references,
        unKeyword:store.publication.unKeyword,
        addInformation:store.publication.addInformation,
        comment:store.publication.comment


    };
}
let mapDispatchToProps = {
    savePublicationTitle, savePublicationAbstract,
    savePublicationStatus,savePublicationDateType,savePublicationDate,savePublicationId,savePublicationURL,
    savePublicationEmailAddress,savePublicationReferences,savePublicationUnKeyword,savePublicationAddInformation,savePublicationComment
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPublication);