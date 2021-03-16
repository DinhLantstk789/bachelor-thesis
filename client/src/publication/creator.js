import {Component, Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {connect} from "react-redux";
import validator from "../utils/validator";
import {savePublicationCreators} from "../redux/actions";

class Creator extends Component {
    onAdd = () => {
        let currentCreators = this.props.creators;
        currentCreators = currentCreators.concat({familyName: '', givenName: '', email: '', department: ''});
        this.props.savePublicationCreators(currentCreators);
    }

    updateMatchedUser(index) {
        const creatorData = {
            'hungpn@vnu.edu.vn': {email: 'hungpn@vnu.edu.vn', familyName: 'Pham', givenName: 'Ngoc Hung', department: 'FIT'},
            'suongpt@vnu.edu.vn': {email: 'suongpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Suong', department: 'FIT'},
            'trangpt@vnu.edu.vn': {email: 'trangpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Trang', department: 'FIT'}
        }
        let email = this.props.creators[index].email;
        if (email in creatorData) {
            let creators = this.props.creators;
            creators[index] = creatorData[email];
            this.props.savePublicationCreators(creators);
        }
    }

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Creators &nbsp;<i className='fa fa-plus-circle' onClick={this.onAdd}/></h6></div>
                {this.props.creators.map((item, i) => (
                    <Row style={{marginTop: 10}}>
                        <Col style={{marginRight: -10}}>
                            <FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 5} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].familyName = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate()
                            }}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 5} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].givenName = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate()
                            }}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].email = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.updateMatchedUser(i);
                                this.forceUpdate()
                            }}/>
                        </Col>
                        <Col style={{marginLeft: -10}}>
                            <FormInput placeholder="Department" value={item.department} valid={item.department.length > 10} onChange={(e) => {
                                let creators = this.props.creators;
                                creators[i].department = e.target.value;
                                this.props.savePublicationCreators(creators);
                                this.forceUpdate()
                            }}/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    console.log('passing props', store.publication.creators);
    return {creators: store.publication.creators};
}
let mapDispatchToProps = {savePublicationCreators};
export default connect(mapStateToProps, mapDispatchToProps)(Creator);