import {Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import Profile from "../profile";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "../rows/userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../utils/apiCalls";
import {saveOpeningProfileTab} from "../redux/actions";
import {searchUsers, sortUsers, userSorting} from "../utils/configs";
import SortingSelector from "../publication/sortingSelector";


export default function Management() {
    const windowHeight = useSelector(store => store.home.windowHeight);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isTriggerReload, setIsTriggerReload] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingProfileTab = useSelector(store => store.newUser.openingProfileTab);
    const dispatch = useDispatch();

    const [sortBy, setSortBy] = useState(userSorting[0]);
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

    let filteredUsers = searchUsers(sortUsers(userAccounts, sortBy), searchContent);
    return (
        <Row style={{marginRight: 50, marginLeft: 50}}>
            <Col md={openingProfileTab === 'Add user' || openingProfileTab === 'Update user' ? 8 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={8}>
                                <Row>
                                    <h5 style={{lineHeight: 1.5, marginTop: 10, marginLeft: 10, marginRight: 30}}>&nbsp;
                                        {loggedUser.divisions.length === 1 ? ('Người dùng - ' + loggedUser.divisions[0]) : 'Tất cả người dùng'}
                                    </h5>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Row className='float-right'>
                                    <Button pill theme='light' style={{marginRight: 10}} onClick={() => {
                                        if (searchOpen) setSearchContent('');
                                        setSearchOpen(!searchOpen);
                                    }}><i className='fa fa-search'/>
                                    </Button>
                                    <SortingSelector sortingType='user' onSelected={(s) => setSortBy(s)}/>
                                    {!(openingProfileTab === 'Add user' || openingProfileTab === 'Update user') ?
                                        <Button pill theme="light" style={{marginRight: 10, marginLeft: 2}} onClick={() => dispatch(saveOpeningProfileTab('Add user'))}>
                                            Thêm mới &nbsp;<i className='fa fa-plus'/>
                                        </Button> : ''}
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody style={{overflow: "scroll", height: windowHeight - 270}}>
                        {searchOpen ? <InputGroup style={{marginBottom: 30}}>
                            <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                            <FormInput value={searchContent} placeholder="Tìm người dùng theo tên hoặc email" onChange={(e) => setSearchContent(e.target.value)}/>
                        </InputGroup> : ''}
                        {isFirstLoading ? <div style={{width: 1000}}><List/><List style={{marginTop: 20}}/></div> : filteredUsers.map(item => (
                            <UserRow triggerReload={() => setIsTriggerReload(!isTriggerReload)} academicTitle={item.academicTitle} managerTitle={item.managerTitle} unionTitle={item.unionTitle}
                                     givenName={item.givenName} familyName={item.familyName} email={item.email} isAdmin={item.isAdmin} department={item.department}/>
                        ))}
                    </CardBody>
                </Card>
            </Col>
            {openingProfileTab === 'Add user' || openingProfileTab === 'Update user' ?
                <Col md={4} style={{paddingLeft: 40, paddingRight: 30}}>
                    <Profile triggerReload={() => setIsTriggerReload(!isTriggerReload)}/>
                </Col> : ''}
        </Row>
    );
}

