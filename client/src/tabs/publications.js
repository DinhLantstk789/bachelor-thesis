import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormCheckbox, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import NewPublication from "../publication/newPublication";
import PublicationList from "./publicationList";
import {useDispatch, useSelector} from "react-redux";
import {
    resetArticle, resetBookSection, resetConference,
    resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel, savePublicationApproval,
    savePublicationSortBy, saveSearchPublicationContent, saveViewingPublicationId, setDashboardState
} from "../redux/actions";
import * as apiCalls from "../utils/apiCalls";
import {ClipLoader} from "react-spinners";
import YearSelector from "../publication/yearSelector";
import SortingSelector from "../publication/sortingSelector";

export default function Publications() {
    const windowHeight = useSelector(store => store.home.windowHeight);
    const [searchOpen, setSearchOpen] = useState(false);
    const [approvalFilter, setApprovalFilter] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [isApproving, setIsApproving] = useState(false);

    const {loggedUser, searchPublicationContent, publicationId, publicationApproval, isAddingPublication, displayingPublicationLabel, sortBy} = useSelector(store => ({
        loggedUser: store.user.loggedUser,
        searchPublicationContent: store.publication.searchPublicationContent,
        publicationId: store.publication.articleId,
        publicationApproval: store.publication.publicationApproval,
        isAddingPublication: store.publication.isAddingPublication,
        displayingPublicationLabel: store.publication.displayingPublicationLabel,
        sortBy: store.publication.sortBy
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        // if (loggedUser.isAdmin) {
        //     setApprovalFilter(false);
        //     setPendingFilter(true);
        // } else {
        //     setApprovalFilter(true);
        //     setPendingFilter(false);
        // }
        setApprovalFilter(true);
        setPendingFilter(true);
    }, [])

    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col md={5}>
                        <Row>
                            {isAddingPublication ? <Button pill theme='light' style={{marginLeft: 15}} onClick={() => {
                                dispatch(setDashboardState(false));
                                dispatch(resetArticle());
                                dispatch(resetBookSection());
                                dispatch(resetConference());
                                dispatch(resetPublication());
                                dispatch(resetTechnicalReport());
                                dispatch(saveDisplayingPublicationLabel('Publications'));
                                dispatch(saveViewingPublicationId(null));
                            }}><i className='fa fa-chevron-left'/></Button> : ''}
                            <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}> &nbsp; {displayingPublicationLabel}</h5>
                            {isAddingPublication ? '' : <div style={{paddingTop: 10}}>
                                <Badge theme={approvalFilter ? 'success' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setApprovalFilter(!approvalFilter);
                                }}>Đã phê duyệt &nbsp;<i className="fas fa-check"/> </Badge>
                                <Badge theme={pendingFilter ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                    setPendingFilter(!pendingFilter);
                                }}>Chờ phê duyệt &nbsp;<i className="fas fa-clock"/> </Badge>
                            </div>}
                        </Row>
                    </Col>
                    <Col md={7}>
                        {isAddingPublication ? '' :
                            <div>
                                <Row className='float-right'>
                                    <Button pill theme='light' style={{marginRight: 10}} onClick={() => {
                                        if (searchOpen) dispatch(saveSearchPublicationContent(''));
                                        setSearchOpen(!searchOpen);
                                    }}><i className='fa fa-search'/>
                                    </Button>
                                    <SortingSelector sortingType='publication' onSelected={(s) => dispatch(savePublicationSortBy(s))}/>
                                    <Button pill theme='light' style={{marginRight: 10, marginLeft: 5}} onClick={() => {
                                        if (searchOpen) dispatch(saveSearchPublicationContent(''));
                                        setSearchOpen(false);
                                        dispatch(setDashboardState(true));
                                        dispatch(saveDisplayingPublicationLabel('New Publication'));
                                    }}>Thêm mới &nbsp;<i className='fa fa-plus'/>
                                    </Button>
                                </Row>
                                <Row className='float-right' style={{marginRight: 18}}>
                                    <YearSelector onSelected={(s) => dispatch(saveSearchPublicationContent('' + s))}/>
                                </Row>
                            </div>}
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
            <CardBody style={{overflow: "scroll", height: windowHeight - 270}}>
                {searchOpen ? <InputGroup style={{marginBottom: 30}}>
                    <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                    <FormInput value={searchPublicationContent} placeholder="Tìm kiếm bài báo, tác giả, năm xuất bản" onChange={(e) => {
                        dispatch(saveSearchPublicationContent(e.target.value))
                    }}/>
                </InputGroup> : ''}
                <div>
                    {isAddingPublication ? <NewPublication/> : <PublicationList isForImpactScore={false} approvalFilter={approvalFilter} pendingFilter={pendingFilter}/>}
                </div>
            </CardBody>
        </Card>
    )
}
