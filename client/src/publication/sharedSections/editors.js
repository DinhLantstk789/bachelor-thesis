import { Fragment} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationEditors} from "../../redux/actions";
import validator from "../../utils/validator";

export default function Editors () {
    const editors = useSelector(store =>store.publication.editors);
    const dispatch = useDispatch();
    let updateMatchedUser = (index)=> {
        const creatorData = {
            'hungpn@vnu.edu.vn': {email: 'hungpn@vnu.edu.vn', familyName: 'Pham', givenName: 'Ngoc Hung'},
            'suongpt@vnu.edu.vn': {email: 'suongpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Suong'},
            'trangpt@vnu.edu.vn': {email: 'trangpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Trang'}
        }
        let email = editors[index].email;
        if (email in creatorData) {
            let editors = editors;
            editors[index] = creatorData[email];
            dispatch(savePublicationEditors(editors));
        }
    }
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Editors &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    dispatch(savePublicationEditors(this.props.editors.concat({familyName: '', givenName: '', email: ''})))
                }}/></h6></div>
                {editors.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col style={{marginRight: -10}}><FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                    editors[index].email = e.target.value;
                                    dispatch(savePublicationEditors(editors));
                                    updateMatchedUser(index);
                                    this.forceUpdate()
                                }}/></Col>
                                <Col style={{marginRight: -10,marginLeft: -10,}}><FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 2} onChange={(e) => {
                                    editors[index].familyName = e.target.value;
                                    dispatch(savePublicationEditors(editors));
                                    this.forceUpdate()
                                }}/></Col>
                                <Col style={{marginLeft: -10, marginRight: -10}}><FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 5} onChange={(e) => {
                                    editors[index].givenName = e.target.value;
                                    dispatch(savePublicationEditors(editors));
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                dispatch(savePublicationEditors(editors.filter((value, key) => key !== index)))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
}
