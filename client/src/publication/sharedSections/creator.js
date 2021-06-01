import {Component, Fragment, useState} from 'react';
import {Col, FormInput, Row, Tooltip} from "shards-react";
import {connect, useDispatch, useSelector} from "react-redux";
import validator from "../../utils/validator";
import {savePublicationCreators} from "../../redux/actions";
import * as apiCalls from "../../utils/apiCalls";

function AutoCompletedTextField({index, email, creatorData, forceReload}) {
    const [emailInputSuggestionOpen, setEmailInputSuggestionOpen] = useState(false);
    const creators = useSelector(store => store.publication.creators);
    const dispatch = useDispatch();

    const updateMatchedUser = () => {
        let email = creators[index].email;
        if (email in creatorData) {
            let tmpCreators = creators;
            tmpCreators[index] = creatorData[email];
            dispatch(savePublicationCreators(tmpCreators));
        }
    };

    const getSuggestionEmails = () => {
        let filteredEmails = [];
        Object.keys(creatorData).forEach(email => {
            if (email.includes(creators[index].email) && email !== 'admin@eprints.vnu.edu.vn') {
                filteredEmails.push(email);
            }
        })
        return filteredEmails;
    };

    return (
        <Fragment>
            <FormInput id={'emailInput' + index} placeholder="Email" value={email} valid={validator.validateEmail(email)} onChange={(e) => {
                let tmpCreators = creators;
                tmpCreators[index].email = e.target.value;
                dispatch(savePublicationCreators(tmpCreators));
                updateMatchedUser();
                forceReload();
                setEmailInputSuggestionOpen(creators[index].email.length > 0);
            }}/>
            {getSuggestionEmails(index).length > 0 ?
                <Tooltip open={emailInputSuggestionOpen} target={'#emailInput' + index}>
                    {getSuggestionEmails(index).map(email => (<label style={{cursor: 'pointer'}} onClick={() => {
                        setEmailInputSuggestionOpen(false);
                        let tmpCreators = creators;
                        tmpCreators[index].email = email;
                        dispatch(savePublicationCreators(tmpCreators));
                        updateMatchedUser(index);
                        forceReload();
                    }}>{email}</label>))}
                </Tooltip>
                : ''}
        </Fragment>
    )
}

class Creator extends Component {
    state = {
        creatorData: {}
    }

    componentDidMount() {
        apiCalls.fetchUsers({filterApproved: false}, users => {
            users.forEach(u => {
                let prevCreatorData = this.state.creatorData;
                prevCreatorData[u.email] = {
                    email: u.email, familyName: u.familyName, givenName: u.givenName, department: u.department
                }
                this.setState({creatorData: prevCreatorData});
            })
        }, (message) => {
            alert(message);
        })
    }

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Creators &nbsp;<i className='fa fa-plus-circle' onClick={() =>
                    this.props.savePublicationCreators(this.props.creators.concat({familyName: '', givenName: '', email: '', department: ''}))
                }/></h6></div>
                {this.props.creators.map((item, i) => (
                    <Row style={{marginTop: 10, paddingRight: 20}}>
                        <Col style={{marginRight: -10}}>
                            <AutoCompletedTextField index={i} email={item.email} creatorData={this.state.creatorData} forceReload={() => this.forceUpdate()}/>
                        </Col>
                        <Col style={{marginRight: -10, marginLeft: -10}}>
                            <FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 0} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].familyName = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate();
                            }}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 0} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].givenName = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate();
                            }}/>
                        </Col>
                        <Col style={{marginLeft: -10}}>
                            <FormInput placeholder="Department" value={item.department} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].department = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate();
                            }}/>
                        </Col>
                        <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                            this.props.savePublicationCreators(this.props.creators.filter((value, key) => key !== i))
                        }/>
                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {creators: store.publication.creators}
}
let mapDispatchToProps = {savePublicationCreators}
export default connect(mapStateToProps, mapDispatchToProps)(Creator);
