import {Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import { useDispatch, useSelector} from "react-redux";
import validator from "../../utils/validator";
import {savePublicationCreators} from "../../redux/actions";


export default function Creator() {
    const creators = useSelector(store => store.publication.creators);
    const dispatch = useDispatch();

    let updateMatchedUser = (index) => {
        const creatorData = {
            'hungpn@vnu.edu.vn': {email: 'hungpn@vnu.edu.vn', familyName: 'Pham', givenName: 'Ngoc Hung', department: 'FIT'},
            'suongpt@vnu.edu.vn': {email: 'suongpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Suong', department: 'FIT'},
            'trangpt@vnu.edu.vn': {email: 'trangpt@vnu.edu.vn', familyName: 'Pham', givenName: 'Thu Trang', department: 'FIT'}
        }
        let email = creators[index].email;
        if (email in creatorData) {
            let creators = creators;
            creators[index] = creatorData[email];
            dispatch(savePublicationCreators(creators));
        }
    };
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Creators &nbsp;<i className='fa fa-plus-circle' onClick={() =>
                    dispatch(savePublicationCreators(creators.concat({familyName: '', givenName: '', email: '', department: ''})))
                }/></h6></div>
                {creators.map((item, i) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col style={{marginRight: -10}}>
                                    <FormInput placeholder="Email" value={item.email} valid={validator.validateEmail(item.email)} onChange={(e) => {
                                        creators[i].email = e.target.value;
                                        dispatch(savePublicationCreators(creators));
                                        updateMatchedUser(i);
                                        this.forceUpdate()
                                    }}/>
                                </Col>
                                <Col style={{marginRight: -10, marginLeft: -10}}>
                                    <FormInput placeholder="Family Name" value={item.familyName} valid={item.familyName.length > 0} onChange={(e) => {
                                        creators[i].familyName = e.target.value;
                                        dispatch(savePublicationCreators(creators));
                                        this.forceUpdate()
                                    }}/>
                                </Col>
                                <Col style={{marginLeft: -10, marginRight: -10}}>
                                    <FormInput placeholder="Given Name" value={item.givenName} valid={item.givenName.length > 0} onChange={(e) => {
                                        creators[i].givenName = e.target.value;
                                        dispatch(savePublicationCreators(creators));
                                        this.forceUpdate()
                                    }}/>
                                </Col>
                                <Col style={{marginLeft: -10}}>
                                    <FormInput placeholder="Department" value={item.department}  onChange={(e) => {
                                        creators[i].department = e.target.value;
                                        dispatch(savePublicationCreators(creators));
                                        this.forceUpdate()
                                    }}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                dispatch(savePublicationCreators(creators.filter((value, key) => key !== i)))
                            }/>
                        </Col>
                    </Row>

                ))}
            </Fragment>
        )
}
