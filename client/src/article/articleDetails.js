import {Component, Fragment} from 'react';
import {Card, Button, FormTextarea, CardBody, CardHeader, Col, FormInput, Row, FormRadio} from "shards-react";
import RefereedArticle from "../refereedArticle";
import RadioGroup from "../radioGroup";
import {connect} from "react-redux";
import Subject from "../subject";
import validator from "../utils/validator";
import ArticleType from "./articleType";


class ArticleDetails extends Component {
    state = {
        titleCheckedResult: '',
        enteredTitle: '',
        creators: [{familyName: '', givenName: '', email: '', department: ''}],
        enteredISSN: '',
        corporateCreators: [{corporateCreator: ''}, {corporateCreator: ''}],
        editors: [{familyName: '', givenName: '', email: ''}],
        relatedURL: [{URL: '', URLType: ''}],
        enteredIdentificationNumber: '',
        funders: [{funder: ''}],
        projects: [{projectName: ''}],
        copyrightHolders: [{holder: ''}],
        showEmailAddress: false
    }

    onTypingTitle = (event) => {
        this.setState({enteredTitle: event.target.value});
    }
    onTypingISSN = (event) => {
        this.setState({enteredISSN: event.target.value});
    }
    onTypingIdentificationNumber = (event) => {
        this.setState({enteredIdentificationNumber: event.target.value});
    }
    onAddCreator = (event) => {
        let currentCreator = this.state.creators;
        let newCreators = currentCreator.concat({familyName: '', givenName: '', email: '', department: ''});
        this.setState({creators: newCreators});
    }
    onAddCorporateCreator = (event) => {
        let currentCorporateCreator = this.state.corporateCreators;
        let newCurrentCreators = currentCorporateCreator.concat({corporateCreator: ''});
        this.setState({corporateCreators: newCurrentCreators});
    }
    onAddEditor = (event) => {
        let currentEditor = this.state.editors;
        let newEditor = currentEditor.concat({familyName: '', givenName: '', email: ''});
        this.setState({editors: newEditor});
    }
    onAddRelatedURL = (event) => {
        let currentRelatedURL = this.state.relatedURL;
        let newRelatedURL = currentRelatedURL.concat({URL: '', URLType: ''});
        this.setState({relatedURL: newRelatedURL});
    }
    onAddFunder = (event) => {
        let currentFunder = this.state.funders;
        let newFunder = currentFunder.concat({funder: ''});
        this.setState({funders: newFunder});
    }
    onAddProject = (event) => {
        let currentProject = this.state.projects;
        let newProject = currentProject.concat({projectName: ''});
        this.setState({projects: newProject})
    }
    onAddCopyrightHolder = (event) => {
        let currentHolder = this.state.copyrightHolders;
        let newCurrentHolder = currentHolder.concat({holder: ''});
        this.setState({copyrightHolder: newCurrentHolder});
    }

    /* add array list ??? */
    validate = () => {
        let ErrorMessage = "";
        if (this.state.enteredTitle.length === 0 || this.state.enteredISSN.length === 0 ||
            this.state.enteredIdentificationNumber.length === 0) {
            this.setState({ErrorMessage: "Error. The filed is empty."});
        }

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
        switch (this.props.type) {
            case 'article':
                mainComponent =
                    <div>
                        <RefereedArticle/>
                        <FormInput type="text" placeholder="Enter Journal or Publication Title" style={{marginTop: 10}}/>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}}/>
                        <Row style={{marginTop: 10}}>
                            <Col style={{marginLeft: 0, marginRight: -10}}>
                                <FormInput type="text" placeholder="Enter ISSN" onChange={this.onTypingISSN}/>
                            </Col>
                            <Col style={{marginLeft: -10, marginRight: -10}}>
                                <FormInput type="text" placeholder="Enter Volume"/>
                            </Col>
                            <Col style={{marginLeft: -10, marginRight: 0}}>
                                <FormInput type="text" placeholder="Enter Number"/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <h6 style={{marginLeft: 13, marginRight: 30, display: "inline"}}>Page Range</h6>
                            <FormInput type="number" size={"sm"} style={{width: 70}}/>
                            <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                            <FormInput type="number" size={"sm"} style={{width: 70}}/>
                        </Row>
                    </div>
                break;
            case 'book-section':
                mainComponent =
                    <div>
                        <RefereedArticle/>
                        <Row style={{marginTop: 10}}>
                            <h6 style={{marginLeft: 13, marginRight: 30, display: "inline"}}>Page Range</h6>
                            <FormInput type="number" size={"sm"} style={{width: 70}}/>
                            <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                            <FormInput type="number" size={"sm"} style={{width: 70}}/>
                        </Row>
                        <FormInput type="text" placeholder="Enter Title of Book" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Volume" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Series Name" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Number" style={{marginTop: 10}}/>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <FormInput type="text" className="form-control"
                                   placeholder="Enter ISBN" onChange={this.onTypingISSN} style={{marginTop: 10}}/>
                    </div>
                detailComponent = <div>
                    <div style={{marginTop: 20}}><h6>Editors &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddEditor}/></h6></div>
                    {this.state.editors.map((item, index) => (
                        <Row style={{marginTop: 10}}>
                            <Col style={{marginRight: -10}}><FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 5} onChange={(e) => {
                                let oldState = this.state.editors;
                                oldState[index].familyName = e.target.value;
                                this.setState({editors: oldState});
                            }}/></Col>
                            <Col style={{marginLeft: -10, marginRight: -10}}><FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 5} onChange={(e) => {
                                let oldState = this.state.editors;
                                oldState[index].givenName = e.target.value;
                                this.setState({editors: oldState});
                            }}/></Col>
                            <Col style={{marginLeft: -10}}><FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                let oldState = this.state.editors;
                                oldState[index].email = e.target.value;
                                this.setState({editors: oldState});
                            }}/></Col>
                        </Row>
                    ))}
                </div>
                break;
            case 'technical-report':
                mainComponent = <div>
                    <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                </div>
                addComponent = <div>
                    <h6 style={{marginTop: 10, display: "inline"}}>Monograph Type</h6>
                    <div style={{marginLeft: 130}}>
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
                </div>
                break;
            case 'conference-workshop-item':
                mainComponent = <div><RefereedArticle/></div>
                addComponent = <div style={{marginTop:20}}>
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
                    <RefereedArticle/>
                    <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Series Name" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Volume" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number" style={{marginTop: 10}}/>
                    <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                    <FormInput placeholder="Enter ISBN" onChange={this.onTypingISSN} style={{marginTop: 10}}/>
                </div>
                break;
            case 'thesis':
                mainComponent = <div>
                    <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                    <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                </div>
                addComponent = <div>
                    <h6 style={{marginTop: 10, display: "inline"}}>Thesis Type</h6>
                    <div style={{marginLeft: 130}}>
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
                    {this.state.copyrightHolders.map(item => (
                        <span>
                            <Row>
                                <Col sm={8}>
                                      <FormInput placeholder='Copyright Holder' value={item.holder}/>
                                </Col>
                                <Col sm={4}>
                                    <button onClick={this.onAddCopyrightHolder}><i className='fa fa-plus-circle'/></button>
                                </Col>
                            </Row>
                        </span>
                    ))}
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
        return (
            <Fragment>
                <form onSubmit={this.onclickSubmitted}>
                    <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                    <ArticleType/>
                    <FormInput placeholder="Title" onChange={this.onTypingTitle} style={{marginTop: 30}}/>
                    <FormTextarea placeholder="Abstract" style={{marginTop: 10}}/>
                    {addComponent}
                    <div style={{marginTop: 20}}><h6>Creators &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddCreator}/></h6></div>
                    {this.state.creators.map((item, index) => (
                        <span>
                            <Row style={{marginTop: 10}}>
                                <Col style={{marginRight: -10}}><FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 5} onChange={(e) => {
                                    let oldState = this.state.creators;
                                    oldState[index].familyName = e.target.value;
                                    this.setState({creators: oldState});
                                }}/></Col>
                                <Col style={{marginLeft: -10, marginRight: -10}}><FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 5} onChange={(e) => {
                                    let oldState = this.state.creators;
                                    oldState[index].givenName = e.target.value;
                                    this.setState({creators: oldState});
                                }}/></Col>
                                <Col style={{marginLeft: -10, marginRight: -10}}><FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                    let oldState = this.state.creators;
                                    oldState[index].email = e.target.value;
                                    this.setState({creators: oldState});
                                }}/></Col>
                                <Col style={{marginLeft: -10}}><FormInput placeholder="Department" value={item.department} valid={item.department.length > 10} onChange={(e) => {
                                    let oldState = this.state.creators;
                                    oldState[index].department = e.target.value;
                                    this.setState({creators: oldState});
                                }}/></Col>
                            </Row>
                        </span>
                    ))}
                    <div style={{marginTop: 20}}><h6>Corporate Creators &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddCorporateCreator}/></h6></div>
                    {this.state.corporateCreators.map((item, index) => (
                        <Row style={{marginTop: 10}}>
                            <Col><FormInput placeholder="Corporate Creators" value={item.corporateCreator} valid={item.corporateCreator.length > 5} onChange={(e) => {
                                let oldState = this.state.corporateCreators;
                                oldState[index].corporateCreator = e.target.value;
                                this.setState({corporateCreators: oldState});
                            }}/></Col>
                        </Row>
                    ))}
                    {detailComponent}
                    <h6 style={{marginTop: 15}}>Divisions</h6>
                    <select multiple="" className="form-control" size="7">
                        <option>Advanced Institute of Engineering and Technology (AVITECH)</option>
                        <option>Department of Civil Engineering and Transportation (CET)</option>
                        <option>Center for Electronics and Telecommunications Research (CETR)</option>
                        <option>Faculty of Agriculture Technology (FAT)</option>
                        <option>Faculty of Electronics and Telecommunications (FET)</option>
                        <option>Faculty of Engineering Mechanics and Automation (FEMA)</option>
                        <option>Faculty of Engineering Physics and Nanotechnology</option>
                        <option>Faculty of Information Technology (FIT)</option>
                        <option>Key Laboratory for Nanotechnology (Nano Lab)</option>
                        <option>School of Aerospace Engineering (SAE)</option>
                        <option>Key Laboratory for Smart Integrated Systems (SISLAB)</option>
                    </select>
                    <Card style={{marginTop: 30}}>
                        <CardHeader>
                            <label style={{fontSize: 20}}>Publication Details</label>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <h6 style={{marginRight: 38, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Status:</h6>
                                <RadioGroup enableTooltip={false} inline={true} radioArray={[{
                                    name: 'Published', id: 'published',
                                }, {
                                    name: 'In Press', id: 'inPress',
                                }, {
                                    name: 'Submitted', id: 'submitted',
                                }, {
                                    name: 'Unpublished', id: 'unPublished',
                                }]} onSelected={() => {
                                }}/>
                            </div>
                            {mainComponent}
                            <Row style={{marginTop: 10}}>
                                <h6 style={{marginLeft: 13, marginRight: 80, display: "inline"}}>Date</h6>
                                <FormInput placeholder="My form input" type="date" style={{width: 200}}/>
                            </Row>
                            <div style={{marginTop: 10}}>
                                <h6 style={{marginRight: 10, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Date Type:</h6>
                                <RadioGroup enableTooltip={false} inline={true} radioArray={[{
                                    name: 'Unspecified', id: 'unSpecified',
                                }, {
                                    name: 'Publication', id: 'publication',
                                }, {
                                    name: 'Submission', id: 'submission',
                                }, {
                                    name: 'Completion', id: 'completion',
                                }]} onSelected={() => {
                                }}/>
                            </div>
                            <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                            <FormInput placeholder="Identification Number" onChange={this.onTypingIdentificationNumber} style={{marginTop: 10}}/>
                            <FormInput placeholder="Official URL" style={{marginTop: 10}}/>
                            <div style={{marginTop: 20}}><h6 style={{display: "inline"}}>Related URLs &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddRelatedURL}/></h6></div>
                            {this.state.relatedURL.map((item, index) => (
                                <span>
                                <Row style={{marginTop: 20}}>
                                    <Col><FormInput placeholder="URL" value={item.URL} valid={item.URL.length > 5} onChange={(e) => {
                                        let oldState = this.state.relatedURL;
                                        oldState[index].URL = e.target.value;
                                        this.setState({relatedURL: oldState});
                                    }}/></Col>
                                    <Col><FormInput placeholder="URL" value={item.URLType} valid={item.URLType.length > 5} onChange={(e) => {
                                        let oldState = this.state.relatedURL;
                                        oldState[index].URLType = e.target.value;
                                        this.setState({relatedURL: oldState});
                                    }}/></Col>
                                </Row>
                            </span>
                            ))}
                        </CardBody>
                    </Card>
                    <div style={{marginTop: 20}}><h6 style={{display: "inline"}}>Funders &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddFunder}/></h6></div>
                    {this.state.funders.map((item, index) => (
                        <span>
                            <Row style={{marginTop: 20}}>
                                <Col><FormInput style={{marginBottom: 10}} placeholder="Funder" value={item.funder} valid={item.funder.length > 5} onChange={(e) => {
                                    let oldState = this.state.funders;
                                    oldState[index].funder = e.target.value;
                                    this.setState({funders: oldState});
                                }}/></Col>
                            </Row>
                        </span>
                    ))}
                    <div style={{marginTop: 10}}><h6 style={{display: "inline"}}>Projects &nbsp;<i className='fa fa-plus-circle' onClick={this.onAddProject}/></h6></div>
                    {this.state.projects.map((item, index) => (
                        <span>
                            <Row style={{marginTop: 20}}>
                                <Col><FormInput style={{marginBottom: 10}} placeholder="Project" value={item.projectName} valid={item.projectName.length > 5} onChange={(e) => {
                                    let oldState = this.state.projects;
                                    oldState[index].projectName = e.target.value;
                                    this.setState({projects: oldState});
                                }}/></Col>
                            </Row>
                        </span>
                    ))}
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
                        <FormInput type="text" id="emailAddress" placeholder="Email Address"
                                   style={{marginTop: 10, display: this.state.showEmailAddress ? 'block' : 'none'}}/>
                        <FormInput type="text" id="references" placeholder="References"
                                   style={{marginTop: 10, display: this.state.showReferences ? 'block' : 'none'}}/>
                        <FormInput type="text" id="unKeyword" placeholder="Uncontrolled Keywords"
                                   style={{marginTop: 10, display: this.state.showUncontrolledKeyword ? 'block' : 'none'}}/>
                        <FormInput type="text" id="addInformation" placeholder="Additional Information"
                                   style={{marginTop: 10, display: this.state.showAddInformation ? 'block' : 'none'}}/>
                        <FormTextarea type="text" id="comment" placeholder="Comments and Suggestions"
                                      style={{marginTop: 10, display: this.state.showComment ? 'block' : 'none'}}/>
                    </div>
                    <Subject/>
                    <div>
                        <input type="submit" value="Deposit" style={{width: 150, borderRadius: 20, marginTop: 20, backgroundColor: "green", color: "white", fontSize: 20}}/>
                    </div>
                </form>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {type: store.article.articleType};
}
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);