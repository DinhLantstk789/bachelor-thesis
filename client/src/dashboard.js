import {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import NewPublication from "./publication/newPublication";
import Publications from "./publications";
import {useDispatch, useSelector} from "react-redux";
import {resetArticle, resetBookSection, resetConference, resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel, saveViewingPublicationId, setDashboardState} from "./redux/actions";
import * as apiCalls from "./apiCalls";

export default function Dashboard() {
    const [approvalFilter, setApprovalFilter] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const {loggedUser, isAddingPublication, displayingPublicationLabel} = useSelector(store => ({
        loggedUser: store.user.loggedUser,
        isAddingPublication: store.publication.isAddingPublication,
        displayingPublicationLabel: store.publication.displayingPublicationLabel
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedUser.isAdmin) {
            setApprovalFilter(false);
            setPendingFilter(true);
        } else {
            setApprovalFilter(true);
            setPendingFilter(false);
        }
    }, [])
    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col>
                        <Row>
                            {isAddingPublication ? <Button pill theme='success' style={{marginRight: 15}} onClick={() => {
                                dispatch(setDashboardState(false));
                                dispatch(resetArticle());
                                dispatch(resetBookSection());
                                dispatch(resetConference());
                                dispatch(resetPublication());
                                dispatch(resetTechnicalReport());
                                dispatch(saveDisplayingPublicationLabel('My Publication'));
                                dispatch(saveViewingPublicationId(null));
                            }}><i className='fa fa-backward'/>&nbsp; Back
                            </Button> : ''}
                            <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>{displayingPublicationLabel}</h5>
                            {isAddingPublication ? '' : <div style={{paddingTop: 10}}>
                                <Badge theme={approvalFilter ? 'primary' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setApprovalFilter(!approvalFilter);
                                }}>Approved &nbsp;<i className="fas fa-check"/> </Badge>
                                <Badge theme={pendingFilter ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setPendingFilter(!pendingFilter);
                                }}>Pending &nbsp;<i className="fas fa-clock"/> </Badge>
                            </div>}
                        </Row>
                    </Col>
                    <Col>
                        {isAddingPublication ? '' : <Row className='float-right'>
                            <Button pill style={{marginRight: 15}} onClick={() => {
                                dispatch(setDashboardState(true));
                                dispatch(saveDisplayingPublicationLabel('New Publication'));
                            }}>New &nbsp;<i className='fa fa-plus'/>
                            </Button>
                        </Row>}
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {isAddingPublication ? <NewPublication/> : <Publications approvalFilter={approvalFilter} pendingFilter={pendingFilter} />}
            </CardBody>
        </Card>
    )
}
