import {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardHeader, Col, FormCheckbox, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import NewPublication from "../publication/newPublication";
import Publications from "./publications";
import {useDispatch, useSelector} from "react-redux";
import {
    resetArticle,
    resetBookSection,
    resetConference,
    resetPublication,
    resetTechnicalReport,
    saveDisplayingPublicationLabel,
    savePublicationApproval,
    saveSearchPublicationContent,
    saveViewingPublicationId,
    setDashboardState
} from "../redux/actions";
import * as apiCalls from "../utils/apiCalls";
import {ClipLoader} from "react-spinners";

export default function Dashboard() {
    const [approvalFilter, setApprovalFilter] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const {loggedUser, searchPublicationContent, publicationId, publicationApproval, isAddingPublication, displayingPublicationLabel} = useSelector(store => ({
        loggedUser: store.user.loggedUser,
        searchPublicationContent: store.publication.searchPublicationContent,
        publicationId: store.publication.articleId,
        publicationApproval: store.publication.publicationApproval,
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
                            {isAddingPublication ? <Button pill theme='light' style={{marginRight: 15}} onClick={() => {
                                dispatch(setDashboardState(false));
                                dispatch(resetArticle());
                                dispatch(resetBookSection());
                                dispatch(resetConference());
                                dispatch(resetPublication());
                                dispatch(resetTechnicalReport());
                                dispatch(saveDisplayingPublicationLabel('My Publications'));
                                dispatch(saveViewingPublicationId(null));
                            }}><i className='fa fa-chevron-left'/>&nbsp; Back</Button> : ''}
                            <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>{displayingPublicationLabel}</h5>
                            {isAddingPublication ? '' : <div style={{paddingTop: 10}}>
                                <Badge theme={approvalFilter ? 'success' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setApprovalFilter(!approvalFilter);
                                }}>Approved &nbsp;<i className="fas fa-check"/> </Badge>
                                <Badge theme={pendingFilter ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setPendingFilter(!pendingFilter);
                                }}>Pending &nbsp;<i className="fas fa-clock"/> </Badge>
                            </div>}
                        </Row>
                    </Col>
                    <Col>
                        {isAddingPublication ? '' :
                            <Row className='float-right'>
                                <InputGroup style={{width: 500}}>
                                    <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                                    <FormInput value={searchPublicationContent} placeholder="Search for publications, authors, and years" onChange={(e) => dispatch(saveSearchPublicationContent(e.target.value))}/>
                                    <Button pill theme='light' style={{marginRight: 15, marginLeft: 15}} onClick={() => {
                                        dispatch(setDashboardState(true));
                                        dispatch(saveDisplayingPublicationLabel('New Publication'));
                                    }}>New &nbsp;<i className='fa fa-plus'/>
                                    </Button>
                                </InputGroup>
                            </Row>}
                        <Row className='float-right' style={{marginTop: 10}}>
                            {(displayingPublicationLabel === 'Publication Details' && loggedUser.isAdmin) ?
                                isApproving ? <span style={{marginRight: 20}}><ClipLoader size={25} color={'#157ffb'} loading/></span> :
                                    <FormCheckbox toggle checked={publicationApproval} onChange={() => {
                                        setIsApproving(true);
                                        apiCalls.toggleApprovePublication({id: publicationId}, (message) => {
                                            dispatch(savePublicationApproval(!publicationApproval));
                                            setIsApproving(false);
                                        }, (message) => {
                                            alert(message);
                                            setIsApproving(false);
                                        });
                                    }}/>
                                : ''}
                        </Row>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {isAddingPublication ? <NewPublication/> : <Publications approvalFilter={approvalFilter} pendingFilter={pendingFilter} />}
            </CardBody>
        </Card>
    )
}
