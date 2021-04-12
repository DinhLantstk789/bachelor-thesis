import {Fragment} from 'react';
import {Col, Row} from "shards-react";


export default function UserRow({givenName, familyName, email}) {
    return (
        <Fragment>
            <Row>
                <Col md={8}>
                    <Row style={{marginLeft: 0}}>
                        <h6>{givenName}&nbsp;{familyName}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{email}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'/>
                        <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash'/>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
};

