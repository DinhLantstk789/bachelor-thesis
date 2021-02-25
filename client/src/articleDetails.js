import {Component, Fragment} from 'react';
import validator from "./validator";
import Footer from "./footer";

class ArticleDetails extends Component {
    state = {
        type: 'article',
        titleCheckedResult: '',
        enteredTitle: '',
        creators: [{familyName: 'B', givenName: ' .', email: 'a@gmail.com', department: ''},
            {familyName: 'P', givenName: 'TS', email: 'ts@gmail.com', department: ''}],
        enteredISSN: '',
        corporateCreators: [{corporateCreator: 'aaa'}, {corporateCreator: 'tb'}],
        editors: [{familyName: '', givenName: '', email: ''}],
        relatedURL: [{URL: 'a', URLType: 'b'}],
        enteredIdentificationNumber: '',
        funders: [{funder: 'a'}],
        projects: [{projectName: 'a'}],
        copyrightHolders: [{holder: ''}]
    }

    constructor(props, context) {
        super(props, context);
        this.state.type = this.props.type;
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
        switch (this.state.type) {
            case 'article':
                mainComponent =
                    <div>
                        <label className="col-md-3 control-label">Refereed</label>
                        <div className="col-md-9">
                            <div className="a">
                                <div className="radio-list">
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="yes" checked="checked"/>
                                                </span>
                                        </div>
                                        Yes,this version has been refereed
                                    </label>
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="no" checked=""/>
                                                </span>
                                        </div>
                                        No, this version has not been refereed
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input type="text" className="form-control" id="journalOrPublication"
                               placeholder="Enter Journal or Publication Title"/>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <input type="text" className="form-control"
                               placeholder="Enter ISSN" onChange={this.onTypingISSN}/>
                        <input type="text" className="form-control"
                               placeholder="Enter Publisher"/>
                        <input type="text" className="form-control"
                               placeholder="Enter Volume"/>
                        <input type="text" className="form-control"
                               placeholder="Enter Number"/>
                        <div className=" control-label">
                            <label htmlFor="name">Page Rage</label>
                            <input type="text" id="pageRange" size={8}/>
                            <label htmlFor="address">to</label>
                            <input type="text" id="pageRange" size={8}/>
                        </div>
                    </div>
                break;
            case 'book-section':
                mainComponent =
                    <div>
                        <div className="form-group">
                            <div><label className="control-label">Editors</label></div>
                            {this.state.editors.map(item => (
                                <span className="add">
                                        <div className="row">
                                        <div className="column">
                                        <input type="text" className="form-control" placeholder="Family Name"
                                               value={item.familyName}/>
                                        </div>
                                        <div className="column">
                                        <input type="text" className="form-control" placeholder="Given Name"
                                               value={item.givenName}/>
                                        </div>
                                        <div className="column">
                                        <input type="text" className="form-control" placeholder="Email"
                                               value={item.email}/>
                                        </div>
                                        </div>
                                    </span>
                            ))}
                            <button onClick={this.onAddEditor}>More input rows</button>
                        </div>
                        <label className="col-md-3 control-label">Refereed</label>
                        <div className="col-md-9">
                            <div className="a">
                                <div className="radio-list">
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="yes" checked="checked"/>
                                                </span>
                                        </div>
                                        Yes,this version has been refereed
                                    </label>
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="no" checked=""/>
                                                </span>
                                        </div>
                                        No, this version has not been refereed
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=" control-label">
                            <label htmlFor="name">Page Rage</label>
                            <input type="text" id="pageRange" size={8}/>
                            <label htmlFor="address">to</label>
                            <input type="text" id="pageRange" size={8}/>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Title of Book"/>
                        <input type="text" className="form-control" placeholder="Enter Volume"/>
                        <input type="text" className="form-control" placeholder="Enter Place of Publication"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                        <input type="text" className="form-control" placeholder="Enter Number of Pages"/>
                        <input type="text" className="form-control" placeholder="Enter Series Name"/>
                        <input type="text" className="form-control" placeholder="Enter Number"/>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <input type="text" className="form-control"
                               placeholder="Enter ISBN" onChange={this.onTypingISSN}/>
                    </div>
                break;
            case 'technical-report':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Institution"/>
                        <input type="text" className="form-control" placeholder="Enter Department"/>
                        <input type="text" className="form-control" placeholder="Enter Place of Publication"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                        <input type="text" className="form-control" placeholder="Enter Number of Pages"/>
                    </div>
                addComponent =
                    <div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Monograph Type</label>
                            <div className="col-md-9">
                                <div className="a">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="technical-report" checked="checked"/>
                                        </span>
                                            </div>
                                            Technical Report
                                        </label>
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="project-report" checked=""/>
                                        </span>
                                            </div>
                                            Project Report
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="documentation" checked=""/>
                                                </span>
                                            </div>
                                            Documentation
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="manual" checked=""/>
                                                </span>
                                            </div>
                                            Manual
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="working-paper" checked=""/>
                                                </span>
                                            </div>
                                            Working Paper
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="discussion-paper" checked=""/>
                                                </span>
                                            </div>
                                            Discussion Paper
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="other" checked=""/>
                                                </span>
                                            </div>
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                break;
            case 'conference-workshop-item':
                mainComponent =
                    <div>
                        <label className="col-md-3 control-label">Refereed</label>
                        <div className="col-md-9" id="conference">
                            <div className="a">
                                <div className="radio-list">
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="yes" checked="checked"/>
                                                </span>
                                        </div>
                                        Yes,this version has been refereed
                                    </label>
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="no" checked=""/>
                                                </span>
                                        </div>
                                        No, this version has not been refereed
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                addComponent =
                    <div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Presentation Type</label>
                            <div className="col-md-9">
                                <div className="a">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="paper" checked="checked"/>
                                        </span>
                                            </div>
                                            Paper
                                        </label>
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="lecture" checked=""/>
                                        </span>
                                            </div>
                                            Lecture
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="speech"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Speech
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="poster"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Poster
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="keynote"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Keynote
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="other"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                break;
            case 'book':
                mainComponent =
                    <div>
                        <label className="col-md-3 control-label">Refereed</label>
                        <div className="col-md-9">
                            <div className="a">
                                <div className="radio-list">
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="yes" checked="checked"/>
                                                </span>
                                        </div>
                                        Yes,this version has been refereed
                                    </label>
                                    <label>
                                        <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="refereed" value="no" checked=""/>
                                                </span>
                                        </div>
                                        No, this version has not been refereed
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Place of Publication"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                        <input type="text" className="form-control" placeholder="Enter Number of Pages"/>
                        <input type="text" className="form-control" placeholder="Enter Series Name"/>
                        <input type="text" className="form-control" placeholder="Enter Volume"/>
                        <input type="text" className="form-control" placeholder="Enter Number"/>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <input type="text" className="form-control"
                               placeholder="Enter ISBN" onChange={this.onTypingISSN}/>
                    </div>
                break;
            case 'thesis':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Institution"/>
                        <input type="text" className="form-control" placeholder="Enter Department"/>
                        <input type="text" className="form-control" placeholder="Enter Number of Pages"/>
                    </div>
                ;
                addComponent =
                    <div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Thesis Type</label>
                            <div className="col-md-9">
                                <div className="a">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="diploma" checked="checked"/>
                                        </span>
                                            </div>
                                            Diploma
                                        </label>
                                        <label>
                                            <div className="radio">
                                        <span className="checked">
                                            <input type="radio" value="masters" checked=""/>
                                        </span>
                                            </div>
                                            Masters
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="doctoral" checked=""/>
                                                </span>
                                            </div>
                                            Doctoral
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="post-doctoral" checked=""/>
                                                </span>
                                            </div>
                                            Post-Doctoral
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" value="other" checked=""/>
                                                </span>
                                            </div>
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                break;
            case 'patent':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Patent Applicant"/>
                        <input type="text" className="form-control" placeholder="Enter Number of Pages"/>
                    </div>
                ;
                break;
            case 'image':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Media of Output"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                    </div>
                break;
            case 'video':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Media of Output"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                    </div>
                break;
            case 'dataset':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Media of Output"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                    </div>
                ;
                break;
            case 'experiment':
                mainComponent =
                    <div>
                        <p>experiment</p>
                    </div>
                break;
            case 'teaching-resource':
                mainComponent =
                    <div>
                        <div className="form-group">
                            <div><label className=" control-label">Copyright Holders</label></div>
                            {this.state.copyrightHolders.map(item => (
                                <span className="add">
                                        <div className="row">
                                             <input type="text" className="form-control"
                                                    placeholder='Copyright Holder'
                                                    value={item.holder}/>
                                        </div>
                                    </span>
                            ))}
                            <button onClick={this.onAddCopyrightHolder}>More input rows</button>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                    </div>
                break;
            case 'project-grant':
                mainComponent =
                    <div>
                        <input type="text" className="form-control" placeholder="Enter Place of Publication"/>
                        <input type="text" className="form-control" placeholder="Enter Publisher"/>
                    </div>
                break;
        }
        return (
            <Fragment>
                <form onSubmit={this.onclickSubmitted}>
                    <div className="form-group">
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <input type="text" className="form-control" id="title"
                               placeholder="Enter Title" onChange={this.onTypingTitle}/>
                    </div>
                    <div className="form-group">
                                <textarea className="form-control" id="abstract" rows="4"
                                          placeholder="Enter Abstract"/>
                    </div>
                    {addComponent}
                    <div className="form-group">
                        <div><label className=" control-label">Creators</label></div>
                        {this.state.creators.map((item, index) => (
                            <span className="add">
                                        <div className="row">
                                          <div className="column">
                                             <input type="text" className="form-control" placeholder='FamilyName'
                                                    value={item.familyName}/>
                                          </div>
                                          <div className="column">
                                              <input type="text" className="form-control" placeholder='Given Name'
                                                     value={item.givenName}/>
                                          </div>
                                          <div className="column">
                                              <input type="text" className="form-control" placeholder='Email'
                                                     value={item.email}/>
                                          </div>
                                          <div className="column">
                                              <input type="text" className="form-control" placeholder='Department'
                                                     value={item.department}/>
                                          </div>
                                    </div>
                                </span>
                        ))}
                        <button onClick={this.onAddCreator}>More input rows</button>
                    </div>
                    <div className="form-group">
                        <div><label className=" control-label">Corporate Creators</label></div>
                        {this.state.corporateCreators.map(item => (
                            <span className="add">
                                        <div className="row">
                                             <input type="text" className="form-control"
                                                    placeholder='Corporate Creators'
                                                    value={item.corporateCreator}/>
                                        </div>
                                    </span>
                        ))}
                        <button onClick={this.onAddCorporateCreator}>More input rows</button>
                    </div>
                    <div className="form-group">
                        <label>Divisions</label>
                        <select multiple="" className="form-control" size="5">
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
                    </div>
                    <div className="form-group panel-detail">
                        <div className="panel-detail"><h4 className="panel-detail">Publication Details</h4>
                        </div>
                        <label className="col-md-3 control-label">Status</label>
                        <div className="col-md-9">
                            <div className="radio-list">
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="status" value="published"
                                                           checked="checked"/>
                                                </span>
                                    </div>
                                    Published
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="status" value="inPress"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    In Press
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="status" value="submitted"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    Submitted
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="status" value="unpublished"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    Unpublished
                                </label>
                            </div>
                        </div>
                        {mainComponent}
                        <div className="pageRange">
                            <label htmlFor="name">Date</label>
                            <input type="date"/>
                        </div>
                        <label className="col-md-3 control-label">Date Type</label>
                        <div className="col-md-9">
                            <div className="radio-list">
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="dateType" value="option1"
                                                           checked="checked"/>
                                                </span>
                                    </div>
                                    Unspecified
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="dateType" value="option1"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    Publication
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="dateType" value="option1"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    Submission
                                </label>
                                <label>
                                    <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="dateType" value="option1"
                                                           checked=""/>
                                                </span>
                                    </div>
                                    Completion
                                </label>
                            </div>
                        </div>
                        <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                        <input type="text" className="form-control" id="identification"
                               placeholder="Enter Identification Number"
                               onChange={this.onTypingIdentificationNumber}/>
                        <input type="text" className="form-control" id="officialURL"
                               placeholder="Enter Official URL"/>
                        <div><label className=" control-label">Related URLs</label></div>
                        {this.state.relatedURL.map(item => (
                            <span className="addRelatedURLs">
                                        <div className="row">
                                            <div className="column1">
                                                <input type="text" className="form-control" placeholder='URL'
                                                       value={item.URL}/>
                                            </div>
                                            <div className="column1">
                                                <input type="text" className="form-control" placeholder='URL Type'
                                                       value={item.URLType}/>
                                            </div>
                                        </div>
                                    </span>
                        ))}
                        <button onClick={this.onAddRelatedURL}>More input rows</button>
                    </div>
                    <div className="form-group">
                        <div><label className="control-label">Funders</label></div>
                        {this.state.funders.map(item => (
                            <span>
                                <div className="row">
                                             <input type="text" className="form-control"
                                                    placeholder='Enter Funder'
                                                    value={item.funder}/>
                                        </div>
                            </span>
                        ))}
                        <button onClick={this.onAddFunder}>More input rows</button>
                    </div>
                    <div className="form-group">
                        <div><label className="control-label">Projects</label></div>
                        {this.state.projects.map(item => (
                            <span>
                                <div className="row">
                                             <input type="text" className="form-control"
                                                    placeholder='Enter Project'
                                                    value={item.projectName}/>
                                        </div>
                            </span>
                        ))}
                        <button onClick={this.onAddProject}>More input rows</button>
                    </div>
                    <div className="form-group">
                        <button id="setColor" onClick={this.onShowEmailAddress}> Contact Email Address</button>
                        <input type="text" className="form-control" id="emailAddress"/>
                    </div>
                    <div className="form-group">
                        <button id="setColor" onClick={this.onShowReferences}>References</button>
                        <textarea className="form-control" id="references"/>
                    </div>
                    <div className="form-group">
                        <button id="setColor" onClick={this.onShowUncontrolledKeyword}>Uncontrolled Keywords</button>
                        <textarea className="form-control" id="unKeyword"/>
                    </div>
                    <div className="form-group">
                        <button id="setColor" onClick={this.onShowAddInformation}>Additional Information</button>
                        <textarea className="form-control" id="addInformation"/>
                    </div>
                    <div className="form-group">
                        <button id="setColor" onClick={this.onShowComment}>Comments and Suggestions</button>
                        <textarea className="form-control" id="comment"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default ArticleDetails;