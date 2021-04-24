import React, {Fragment, useState} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Row} from "shards-react";
import Footer from "./footer";
import Publications from "./tabs/publications";
import Statistics from "./tabs/statistics";
import Profile from "./profile";
import {useDispatch, useSelector} from "react-redux";
import Management from "./tabs/management";
import {logout} from "./utils/apiCalls";
import {
    resetImpactScore,
    resetPublication,
    resetPublicationFilter,
    resetUserInformation,
    saveImpactScoreSearchPublicationContent,
    saveLoggedUser,
    saveSearchPublicationContent
} from "./redux/actions";
import {ClipLoader} from "react-spinners";
import Filter from "./publication/filter";
import ImpactScore from "./tabs/impactScore";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function Home() {
    const [currentTab, setCurrentTab] = useState('publication-main');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [profileDetailsOpen, setProfileDetailsOpen] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const isAddingPublication = useSelector(store => store.publication.isAddingPublication);
    const statisticsByYears = useSelector(store => store.publication.statisticsByYears);
    const dispatch = useDispatch();

    const clearData = () => {
        dispatch(saveImpactScoreSearchPublicationContent(''));
        dispatch(saveSearchPublicationContent(''));
        dispatch(resetImpactScore());
    }

    return (
        <Fragment>
            <Modal open={profileDetailsOpen} toggle={() => setProfileDetailsOpen(!profileDetailsOpen)}>
                <ModalHeader>
                    <Row style={{marginLeft: 0, marginRight: 0}}>Your profile</Row>
                </ModalHeader>
                <ModalBody>
                    <Profile title='Your profile' triggerReload={() => {
                    }}/>
                </ModalBody>
            </Modal>
            <Alert id="menuNav">
                <Row style={{padding: 10}}>
                    <Col xs={3} md={3} sm={3}><img bottom src="./images/logo.png" style={{width: 170, marginTop: 5, marginLeft: 50}}/></Col>
                    <Col xs={9} md={9} sm={9}>
                        <Row className="float-right">
                            <Button style={{marginLeft: 10, marginRight: 7}} theme={currentTab === 'publication-main' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('publication-main');
                                clearData();
                            }}><i
                                className="fas fa-file"/> &nbsp; Publications</Button>
                            <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'statistics' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('statistics');
                                clearData();
                            }}><i
                                className="fas fa-chart-line"/> &nbsp; Statistics</Button>
                            <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'impact-score' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('impact-score');
                                clearData();
                            }}><i
                                className="fas fa-star"/> &nbsp; Research Hours</Button>
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'user-management' ? 'primary' : 'light'} pill onClick={() => {
                                    setCurrentTab('user-management');
                                    clearData();
                                }}><i className="fas fa-users"/> &nbsp; User Management</Button> : ''}
                            <Dropdown open={openAccount} toggle={() => setOpenAccount(!openAccount)}>
                                <DropdownToggle theme={currentTab === 'profile' ? 'primary' : 'light'} pill id="dropdown1" style={{fontSize: 20, marginRight: 30, marginLeft: 5}} className="float-right">
                                    {isLoggingOut ? <ClipLoader size={15} color={'#157ffb'} loading/> : <i className={"fa fa-user"}/>}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => setProfileDetailsOpen(true)}><i className="fas fa-user-circle"/>&nbsp;&nbsp; Profile</DropdownItem>
                                    <DropdownItem onClick={() => {
                                        setIsLoggingOut(true);
                                        logout(successMessage => {
                                            setIsLoggingOut(false);
                                            dispatch(saveLoggedUser(null));
                                            dispatch(resetPublicationFilter(loggedUser.divisions));
                                            dispatch(resetUserInformation());
                                            dispatch(resetPublication());
                                            clearData();
                                        }, (errorMessage) => alert(errorMessage));
                                    }}><i className="fas fa-sign-out"/>&nbsp;&nbsp; Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Alert>
            {currentTab === 'user-management' ? <Management/> : currentTab === 'impact-score' ? <ImpactScore/> : currentTab === 'statistics' ? <Statistics/> :
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Publications/></Col>
                    <Col md={4}>
                        <div>
                            <div style={{marginRight: 50, marginBottom: 20}}>
                                <h6 style={{textAlign: 'center'}}>Number of publications over years</h6>
                                {statisticsByYears === null ? <div style={{height: 250, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                                    <ResponsiveContainer width='100%' height={250}>
                                        <LineChart data={statisticsByYears}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name" padding={{left: 20, right: 20}}/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Line type="monotone" dataKey="publications" stroke="#8884d8" activeDot={{r: 5}}/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                }
                            </div>
                            {isAddingPublication ? '' : <Filter/>}
                        </div>
                    </Col>
                </Row>
            }
            <Footer/>
        </Fragment>
    )
}