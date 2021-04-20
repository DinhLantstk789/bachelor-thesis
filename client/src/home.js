import {Fragment, useState} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "shards-react";
import Footer from "./footer";
import Dashboard from "./tabs/dashboard";
import Statistics from "./tabs/statistics";
import Profile from "./account/profile";
import {useDispatch, useSelector} from "react-redux";
import UserManagement from "./tabs/userManagement";
import {logout} from "./utils/apiCalls";
import {resetPublication, resetPublicationFilter, resetUserInformation, saveLoggedUser} from "./redux/actions";
import {ClipLoader} from "react-spinners";
import Filter from "./publication/filter";
import ImpactScore from "./tabs/impactScore";

export default function Home() {
    const [currentTab, setCurrentTab] = useState('publication-main');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const isAddingPublication = useSelector(store => store.publication.isAddingPublication);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Alert id="menuNav">
                <Row style={{padding: 10}}>
                    <Col xs={3} md={3} sm={3}><img bottom src="./images/logo.png" style={{width: 170, marginTop: 5, marginLeft: 50}}/></Col>
                    <Col xs={9} md={9} sm={9}>
                        <Row className="float-right">
                            <Button style={{marginLeft: 10, marginRight: 7}} theme={currentTab === 'publication-main' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('publication-main')}><i
                                className="fas fa-file"/> &nbsp; Publications</Button>
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'statistics' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('statistics')}><i
                                    className="fas fa-chart-line"/> &nbsp; Statistics</Button> : ''}
                            <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'impact-score' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('impact-score')}><i
                                className="fas fa-star"/> &nbsp; Impact Score</Button>
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'user-management' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('user-management')}><i className="fas fa-users"/> &nbsp; User Management</Button> : ''}
                            <Dropdown open={openAccount} toggle={() => setOpenAccount(!openAccount)}>
                                <DropdownToggle theme={currentTab === 'profile' ? 'primary' : 'light'} pill id="dropdown1" style={{fontSize: 20, marginRight: 30, marginLeft: 5}} className="float-right">
                                    {isLoggingOut ? <ClipLoader size={15} color={'#ffffff'} loading/> : <i className={"fa fa-user"}/>}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => setCurrentTab('profile')}><i className="fas fa-user-circle"/>&nbsp;&nbsp;Profile</DropdownItem>
                                    <DropdownItem onClick={() => {
                                        setIsLoggingOut(true);
                                        logout(successMessage => {
                                            setIsLoggingOut(false);
                                            dispatch(saveLoggedUser(null));
                                            dispatch(resetPublicationFilter());
                                            dispatch(resetUserInformation());
                                            dispatch(resetPublication());
                                        }, (errorMessage) => alert(errorMessage));
                                    }}><i className="fas fa-sign-out"/>&nbsp;&nbsp;Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Alert>
            {currentTab === 'user-management' ? <UserManagement/> : currentTab === 'impact-score' ? <ImpactScore/> : currentTab === 'statistics' ? <Statistics/> : currentTab === 'publication-main' ?
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Dashboard/></Col>
                    <Col md={4} style={{paddingLeft: 20}}>
                        {isAddingPublication ? '' : <Filter/>}
                    </Col>
                </Row> :
                <Row style={{paddingLeft: 50, paddingRight: 50}}>
                    <Col><Profile title={loggedUser.familyName + ' ' + loggedUser.givenName} triggerReload={() => {
                    }}/></Col>
                </Row>}
            <Footer/>
        </Fragment>
    )
}