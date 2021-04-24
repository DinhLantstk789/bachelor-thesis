import {Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import Profile from "../profile";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "../rows/userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../utils/apiCalls";
import {saveOpeningProfileTab} from "../redux/actions";


export default function Management() {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isTriggerReload, setIsTriggerReload] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingProfileTab = useSelector(store => store.newUser.openingProfileTab);
    const dispatch = useDispatch();

    const [sortingOpen, setSortingOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Recently Added');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchContent, setSearchContent] = useState('');

    useEffect(() => {
        if (isTriggerReload) {
            apiCalls.fetchUsers({filterApproved: true}, users => {
                setIsFirstLoading(false);
                setIsTriggerReload(!isTriggerReload);
                let filteredUsers = [];
                users.map(u => {
                    if (u.email !== 'admin@eprints.vnu.edu.vn' && u.email !== loggedUser.email) { /* ignore super admin and the current user */
                        filteredUsers.push(u);
                    }
                })
                setUserAccounts(filteredUsers);
            }, (message) => {
                alert(message);
            })
        }
    }, [isTriggerReload]);

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>

    /* filtering and sorting */
    let filteredItems = userAccounts;
    if (sortBy === 'Recently Added') filteredItems.sort((a, b) => a.databaseAddedOn > b.databaseAddedOn ? -1 : 1);
    if (sortBy === 'Name Ascending') filteredItems.sort((a, b) => (a.givenName + a.familyName) < (b.givenName + b.familyName) ? -1 : 1);
    if (sortBy === 'Name Descending') filteredItems.sort((a, b) => (a.givenName + a.familyName) > (b.givenName + b.familyName) ? -1 : 1);
    if (sortBy === 'Email Ascending') filteredItems.sort((a, b) => a.email < b.email ? -1 : 1);
    if (sortBy === 'Email Descending') filteredItems.sort((a, b) => a.email > b.email ? -1 : 1);
    /* searching */
    let finalFilteredUserAccountsAfterSearch = [];
    filteredItems.forEach(fi => {
        let canAdd = false;
        const searchKey = searchContent.toLowerCase();
        if (fi.givenName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.familyName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.email.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.department.toLowerCase().includes(searchKey)) canAdd = true;
        if (canAdd) finalFilteredUserAccountsAfterSearch.push(fi);
    })

    return (
        <Row style={{marginRight: 50, marginLeft: 50}}>
            <Col md={openingProfileTab ? 8 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <h5 style={{lineHeight: 1.5, marginTop: 10, marginLeft: 10, marginRight: 30}}><i className='fa fa-users'/>&nbsp;&nbsp; Registered users
                                        {loggedUser.divisions.length === 1 ? (' in the ' + loggedUser.divisions[0]) : ' in all departments'}
                                    </h5>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Row className='float-right'>
                                    <Dropdown open={sortingOpen} toggle={() => setSortingOpen(!sortingOpen)} className='mr-2'>
                                        <DropdownToggle theme='light' pill>Sorted by {sortBy} &nbsp; <i className="fa fa-sort"/></DropdownToggle>
                                        <DropdownMenu>
                                            {['Recently Added', 'Name Ascending', 'Name Descending', 'Email Ascending', 'Email Descending'].map(s => <DropdownItem onClick={() => setSortBy(s)}>{s}</DropdownItem>)}
                                        </DropdownMenu>
                                        <Button pill theme='light' style={{marginLeft: 10}} onClick={() => {
                                            if (searchOpen) setSearchContent('');
                                            setSearchOpen(!searchOpen);
                                        }}><i className='fa fa-search'/>
                                        </Button>
                                        {!openingProfileTab ?
                                            <Button pill theme="light" style={{marginRight: 10, marginLeft: 10}} onClick={() => dispatch(saveOpeningProfileTab(true))}>
                                                Add &nbsp;<i className='fa fa-plus'/>
                                            </Button> : ''}
                                    </Dropdown>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {searchOpen ? <InputGroup style={{marginBottom: 30}}>
                            <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                            <FormInput value={searchContent} placeholder="Search for registered users" onChange={(e) => setSearchContent(e.target.value)}/>
                        </InputGroup> : ''}
                        {isFirstLoading ? loading : finalFilteredUserAccountsAfterSearch.map(item => (
                            <UserRow triggerReload={() => setIsTriggerReload(!isTriggerReload)} academicTitle={item.academicTitle === 'None' ? '' : item.academicTitle + ' '}
                                     givenName={item.givenName} familyName={item.familyName} email={item.email} isAdmin={item.isAdmin} department={item.department}/>
                        ))}
                    </CardBody>
                </Card>
            </Col>
            {openingProfileTab ? <Col md={4} style={{paddingLeft: 40, paddingRight: 30}}><Profile title={'Add new user'} triggerReload={() => setIsTriggerReload(!isTriggerReload)}/></Col> : ''}
        </Row>
    );
}

