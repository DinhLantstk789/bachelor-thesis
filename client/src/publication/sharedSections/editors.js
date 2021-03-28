import {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationEditors} from "../../redux/actions";
import validator from "../../utils/validator";



class Editors extends Component {
    updateMatchedUser(index) {
        const creatorData = {
            'hungpn@vnu.edu.vn': {email: 'hungpn@vnu.edu.vn', familyName: 'Pham', givenName: 'Ngoc Hung'},
            'suongpt@vnu.edu.vn': {email: 'suongpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Suong'},
            'trangpt@vnu.edu.vn': {email: 'trangpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Trang'}
        }
        let email = this.props.editors[index].email;
        if (email in creatorData) {
            let editors = this.props.editors;
            editors[index] = creatorData[email];
            this.props.savePublicationEditors(editors);
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Editors &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    this.props.savePublicationEditors(this.props.editors.concat({familyName: '', givenName: '', email: ''}))
                }}/></h6></div>
                {this.props.editors.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col style={{marginRight: -10}}><FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                    let editors = this.props.editors;
                                    editors[index].email = e.target.value;
                                    this.props.savePublicationEditors(editors);
                                    this.updateMatchedUser(index);
                                    this.forceUpdate()
                                }}/></Col>
                                <Col style={{marginRight: -10,marginLeft: -10,}}><FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 2} onChange={(e) => {
                                    let editors = this.props.editors;
                                    editors[index].familyName = e.target.value;
                                    this.props.savePublicationEditors(editors);
                                    this.forceUpdate()
                                }}/></Col>
                                <Col style={{marginLeft: -10, marginRight: -10}}><FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 5} onChange={(e) => {
                                    let editors = this.props.editors;
                                    editors[index].givenName = e.target.value;
                                    this.props.savePublicationEditors(editors);
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                this.props.savePublicationEditors(this.props.editors.filter((value, key) => key !== index))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {editors: store.publication.editors};
}
let mapDispatchToProps = {savePublicationEditors};
export default connect(mapStateToProps, mapDispatchToProps)(Editors);