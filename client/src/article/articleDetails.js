import {Component, Fragment} from 'react';
import {Card, CardBody, CardHeader, Col, FormInput, Row, FormRadio} from "shards-react";
import RefereedArticle from "../refereedArticle";
import RadioGroup from "../radioGroup";
import {connect} from "react-redux";


class ArticleDetails extends Component {
    state = {
        titleCheckedResult: '',
        enteredTitle: '',
        creators: [{familyName: 'B', givenName: ' .', email: 'a@gmail.com', department: ''}],
        enteredISSN: '',
        corporateCreators: [{corporateCreator: 'aaa'}, {corporateCreator: 'tb'}],
        editors: [{familyName: '', givenName: '', email: ''}],
        relatedURL: [{URL: 'a', URLType: 'b'}],
        enteredIdentificationNumber: '',
        funders: [{funder: 'a'}],
        projects: [{projectName: 'a'}],
        copyrightHolders: [{holder: ''}]

    }

    constructor(props) {
        super(props);
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

    onShowEmailAddress = (event) => {
        let emailAddress = document.getElementById('emailAddress');
        if (emailAddress.style.display === "block") {
            emailAddress.style.display = "none";
        } else {
            emailAddress.style.display = "block";
        }
    }
    onShowReferences = (event) => {
        let references = document.getElementById('references');
        if (references.style.display === "block") {
            references.style.display = "none";
        } else {
            references.style.display = "block";
        }
    }
    onShowUncontrolledKeyword = (event) => {
        let unKeyword = document.getElementById('unKeyword');
        if (unKeyword.style.display === "block") {
            unKeyword.style.display = "none";
        } else {
            unKeyword.style.display = "block";
        }
    }
    onShowAddInformation = (event) => {
        let addInformation = document.getElementById('addInformation');
        if (addInformation.style.display === "block") {
            addInformation.style.display = "none";
        } else {
            addInformation.style.display = "block";
        }
    }
    onShowComment = (event) => {
        let comment = document.getElementById('comment');
        if (comment.style.display === "block") {
            comment.style.display = "none";
        } else {
            comment.style.display = "block";
        }
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
                        <FormInput type="text" placeholder="Enter ISSN" onChange={this.onTypingISSN} style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Volume" style={{marginTop: 10}}/>
                        <FormInput type="text" placeholder="Enter Number" style={{marginTop: 10}}/>
                        <Row style={{marginTop: 10}}>
                            <label style={{marginLeft: 13, marginRight: 30}}>Page Range</label>
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
                            <label style={{marginLeft: 13, marginRight: 30}}>Page Range</label>
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
                detailComponent =
                    <div>
                        <div><label>Editors</label></div>
                        {this.state.editors.map(item => (
                            <span>
                                <Row>
                                    <Col><FormInput placeholder="FamilyName" value={item.familyName}/></Col>
                                    <Col><FormInput placeholder="Given Name" value={item.givenName}/></Col>
                                    <Col><FormInput placeholder="Email" value={item.email}/></Col>
                                    <Col></Col>
                                    <Col><button onClick={this.onAddEditor} id="buttonStyle">More</button></Col>
                                    <Col></Col>
                                </Row>
                                </span>
                        ))}
                    </div>

                break;
            case 'technical-report':
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                    </div>
                addComponent =
                    <div>
                        <label style={{marginTop: 10}}>Monograph Type</label>
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
                mainComponent =
                    <div>
                        <RefereedArticle/>
                    </div>
                addComponent =
                    <div>

                        <label style={{marginTop: 10}}>Presentation Type</label>
                        <div style={{marginLeft: 130}}>
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
                    </div>
                break;
            case 'book':
                mainComponent =
                    <div>
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
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Institution" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Department" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                    </div>
                ;
                addComponent =
                    <div>
                        <label style={{marginTop: 10}}>Thesis Type</label>
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
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Patent Applicant" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                    </div>
                ;
                break;
            case 'image':
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    </div>
                break;
            case 'video':
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    </div>
                break;
            case 'dataset':
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Media of Output" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    </div>
                ;
                break;
            case 'experiment':
                mainComponent = null;
                break;
            case 'teaching-resource':
                mainComponent =
                    <div>
                        {this.state.copyrightHolders.map(item => (
                            <span>
                                <Row>
                                    <Col sm={8}>
                                          <FormInput placeholder='Copyright Holder' value={item.holder}/>
                                    </Col>
                                    <Col sm={4}>
                                        <button onClick={this.onAddCopyrightHolder}>More</button>
                                    </Col>
                                </Row>
                            </span>


                        ))}

                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    </div>
                break;
            case 'project-grant':
                mainComponent =
                    <div>
                        <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                        <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                    </div>
                break;
        }
        return (
            <Fragment>
                <form onSubmit={this.onclickSubmitted}>
                    <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                    <FormInput placeholder="Title" onChange={this.onTypingTitle} style={{marginTop: 30}}/>
                    <FormInput placeholder="Abstract" size="lg" style={{marginTop: 10}}/>
                    {addComponent}
                    <div><label>Creators</label></div>
                    {this.state.creators.map(item => (
                        <span>
                                <Row>
                                    <Col><FormInput placeholder="FamilyName" value={item.familyName}/></Col>
                                    <Col><FormInput placeholder="Given Name" value={item.givenName}/></Col>
                                    <Col><FormInput placeholder="Email" value={item.email}/></Col>
                                    <Col><FormInput placeholder="Department" value={item.department}/></Col>
                                    <Col><button onClick={this.onAddCreator} id="buttonStyle">More</button></Col>
                                    <Col></Col>
                                </Row>
                                </span>
                    ))}
                    <div><label className=" control-label">Corporate Creators</label></div>
                    {this.state.corporateCreators.map(item => (
                        <span>
                                <Row>
                                    <Col sm={8}><FormInput placeholder="Corporate Creators" value={item.corporateCreator}/></Col>
                                    <Col sm={4}><button onClick={this.onAddCorporateCreator} id="buttonStyle">More</button></Col>
                                </Row>
                            </span>
                    ))}
                    {detailComponent}
                    <label>Divisions</label>
                    <select multiple="" className="form-control" size="7">
                        <option>Advanced Insitute of Engineering and Technology (AVITECH)</option>
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
                            <div><label className=" control-label">Status</label></div>
                            <div style={{marginLeft: 70}}>
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
                                <label style={{marginLeft: 13, marginRight: 80}}>Date</label>
                                <FormInput placeholder="My form input" type="date" style={{width: 200}}/>
                            </Row>
                            <div><label className=" control-label">Date Type</label></div>
                            <div style={{marginLeft: 70}}>
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
                            <div><label className=" control-label">Related URLs</label></div>
                            {this.state.relatedURL.map(item => (
                                <span>
                                <Row>
                                    <Col sm={4}><FormInput placeholder="URL" value={item.URL}/></Col>
                                    <Col sm={4}><FormInput placeholder="URL" value={item.URLType}/></Col>
                                    <Col sm={4}><button onClick={this.onAddRelatedURL} id="buttonStyle">More</button></Col>
                                </Row>
                            </span>
                            ))}


                        </CardBody>
                    </Card>

                    <div className="form-group panel-detail">

                    </div>
                    <div><label className="control-label">Funders</label></div>
                    {this.state.funders.map(item => (
                        <span>
                            <Row>
                                <Col sm={8}><FormInput placeholder="Funder" value={item.funder}/></Col>
                                <Col sm={4}><button onClick={this.onAddFunder} id="buttonStyle">More</button></Col>
                            </Row>
                        </span>
                    ))}
                    <div><label className="control-label">Projects</label></div>
                    {this.state.projects.map(item => (
                        <span>
                            <Row>
                                <Col sm={8}><FormInput placeholder="Project" value={item.projectName}/></Col>
                                <Col sm={4}><button onClick={this.onAddProject} id="buttonStyle">More</button></Col>
                            </Row>
                        </span>
                    ))}
                    <div>
                        <button onClick={this.onShowEmailAddress} style={{marginTop: 20, borderRadius: 15, backgroundColor: "dark"}}> Contact Email Address
                        </button>
                        <FormInput type="text" id="emailAddress" placeholder="Email Address" style={{display: "none"}}/>
                    </div>
                    <div>
                        <button onClick={this.onShowReferences} style={{marginTop: 20, borderRadius: 15, backgroundColor: "dark"}}>References</button>
                        <FormInput type="text" id="references" placeholder="References" style={{display: "none"}}/>
                    </div>
                    <div>
                        <button onClick={this.onShowUncontrolledKeyword} style={{marginTop: 20, borderRadius: 15, backgroundColor: "dark"}}>Uncontrolled
                            Keywords
                        </button>
                        <FormInput type="text" id="unKeyword" placeholder="Uncontrolled Keywords" style={{display: "none"}}/>
                    </div>
                    <div>
                        <button onClick={this.onShowAddInformation} style={{marginTop: 20, borderRadius: 15, backgroundColor: "dark"}}>Additional Information
                        </button>
                        <FormInput type="text" id="addInformation" placeholder="Additional Information" style={{display: "none"}}/>
                    </div>
                    <div>
                        <button onClick={this.onShowComment} style={{marginTop: 20, borderRadius: 15, backgroundColor: "dark"}}>Comments and Suggestions</button>
                        <FormInput type="text" id="comment" placeholder="Comments and Suggestions" style={{display: "none"}}/>
                    </div>
                    <div>
                        <input type="submit" value="Submit" style={{width: 150, borderRadius: 20, marginTop: 20, backgroundColor: "green", color: "white", fontSize: 20}}/>
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