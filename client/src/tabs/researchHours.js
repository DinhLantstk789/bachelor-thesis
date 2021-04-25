import {Badge, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "../rows/userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../utils/apiCalls";
import {encodeBase64, saveAs} from '@progress/kendo-file-saver';
import {
    resetImpactScore,
    saveImpactScoreOpeningPublicationDetails,
    saveImpactScoreOpeningUserEmail,
    saveImpactScoreOpeningUserName,
    saveImpactScoreOpeningUserResearchHoursThreshold,
    saveImpactScorePublicationDetailSortBy,
    saveImpactScoreSearchPublicationContent,
    saveImpactScoreTriggerReloadAllPublication,
    saveImpactScoreUserSortBy,
    saveResearchHoursByYears,
    saveSearchPublicationContent
} from "../redux/actions";
import PublicationList from "./publicationList";
import {ClipLoader} from "react-spinners";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {academicTitleToRequiredWorkingHours, managerToExemption, unionTitleToExemption} from "../utils/configs";


export default function ResearchHours() {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isTriggerReload, setIsTriggerReload] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingPublicationDetails = useSelector(store => store.impactScore.openingPublicationDetails);
    const dispatch = useDispatch();

    const [sortingOpen, setSortingOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchUserContent, setSearchUserContent] = useState('');

    /* publication details */
    const [approvalFilter, setApprovalFilter] = useState(true);
    const [pendingFilter, setPendingFilter] = useState(true);
    const [publicationDetailsSearchOpen, setPublicationDetailsSearchOpen] = useState(false);
    const [publicationDetailsSortingOpen, setPublicationDetailsSortingOpen] = useState(false);

    const searchPublicationContent = useSelector(store => store.impactScore.searchPublicationContent);

    const userSortBy = useSelector(store => store.impactScore.userSortBy);
    const publicationDetailsSortBy = useSelector(store => store.impactScore.publicationDetailsSortBy);
    const researchHoursStatisticByYear = useSelector(store => store.impactScore.researchHoursByYears);
    const impactScoreOpeningUserName = useSelector(store => store.impactScore.openingUserName);

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            let currentPoint = null;
            researchHoursStatisticByYear.forEach(d => {
                if (label === d.name) currentPoint = d;
            });
            return (
                <div style={{backgroundColor: '#FFFFFF', opacity: 0.6, padding: 10}}>
                    <h5 className="label">{`Total research hours in ${label}: ${Math.round(currentPoint.hours)}`}</h5>
                    <b>Required Research Hours: </b>{currentPoint.threshold}<br/>
                    <b>Completion Rate: </b>{(100 * currentPoint.hours / currentPoint.threshold).toFixed(2)}% {currentPoint.hours > currentPoint.threshold ? <label style={{color: 'green'}}><i className='fa fa-check'/></label> : '☹️'}<br/>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        if (isTriggerReload) {
            if (!loggedUser.isAdmin) {
                dispatch(saveImpactScoreOpeningPublicationDetails(true));
                dispatch(saveImpactScoreOpeningUserEmail(loggedUser.email));
                dispatch(saveResearchHoursByYears(null));
                dispatch(saveImpactScoreOpeningUserName(loggedUser.givenName + ' ' + loggedUser.familyName));
                dispatch(saveImpactScoreTriggerReloadAllPublication(true));
            }
            apiCalls.fetchUsers({filterApproved: true}, users => {
                setIsFirstLoading(false);
                setIsTriggerReload(!isTriggerReload);
                let filteredUsers = [];
                users.map(u => {
                    // if (u.email === loggedUser.email) dispatch(saveImpactScoreOpeningUserScore(u.impactScore));
                    if (loggedUser.isAdmin && u.email !== 'admin@eprints.vnu.edu.vn') {
                        filteredUsers.push(u);
                    } else {
                        if (u.email === loggedUser.email) {
                            filteredUsers.push(u);
                            dispatch(saveImpactScoreOpeningUserResearchHoursThreshold(academicTitleToRequiredWorkingHours[u.academicTitle] * managerToExemption[u.managerTitle] * unionTitleToExemption[u.unionTitle]));
                        }
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
    let filteredUsers = userAccounts;
    if (userSortBy === 'Recently Added') filteredUsers.sort((a, b) => a.databaseAddedOn > b.databaseAddedOn ? -1 : 1);
    if (userSortBy === 'Score Ascending') filteredUsers.sort((a, b) => a.impactScore < b.impactScore ? -1 : 1);
    if (userSortBy === 'Score Descending') filteredUsers.sort((a, b) => a.impactScore > b.impactScore ? -1 : 1);
    if (userSortBy === 'Name Ascending') filteredUsers.sort((a, b) => (a.givenName + a.familyName) < (b.givenName + b.familyName) ? -1 : 1);
    if (userSortBy === 'Name Descending') filteredUsers.sort((a, b) => (a.givenName + a.familyName) > (b.givenName + b.familyName) ? -1 : 1);
    if (userSortBy === 'Email Ascending') filteredUsers.sort((a, b) => a.email < b.email ? -1 : 1);
    if (userSortBy === 'Email Descending') filteredUsers.sort((a, b) => a.email > b.email ? -1 : 1);
    /* searching */
    let finalFilteredUserAccountsAfterSearch = [];
    filteredUsers.forEach(fi => {
        let canAdd = false;
        const searchKey = searchUserContent.toLowerCase();
        if (fi.givenName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.familyName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.email.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.department.toLowerCase().includes(searchKey)) canAdd = true;
        if (canAdd) finalFilteredUserAccountsAfterSearch.push(fi);
    })

    return (
        <Row style={{marginRight: 50, marginLeft: 50}}>
            {loggedUser.isAdmin ? <Col md={openingPublicationDetails ? 6 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <h5 style={{lineHeight: 1.5, marginTop: 10, marginLeft: 10, marginRight: 30}}><i className='fa fa-users'/>&nbsp;&nbsp; Registered users
                                        {loggedUser.divisions.length === 1 ? ' in the ' + loggedUser.divisions[0] : ' in all departments'}
                                    </h5>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Row className='float-right'>
                                    <Dropdown open={sortingOpen} toggle={() => setSortingOpen(!sortingOpen)} className='mr-2'>
                                        <DropdownToggle theme='light' pill>{userSortBy} &nbsp; <i className="fa fa-sort"/></DropdownToggle>
                                        <DropdownMenu>
                                            {['Recently Added', 'Score Ascending', 'Score Descending', 'Name Ascending', 'Name Descending', 'Email Ascending', 'Email Descending'].map(s =>
                                                <DropdownItem onClick={() => dispatch(saveImpactScoreUserSortBy(s))}>{s}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                        <Button pill theme='light' style={{marginLeft: 10}} onClick={() => {
                                            if (searchOpen) setSearchUserContent('');
                                            setSearchOpen(!searchOpen);
                                        }}><i className='fa fa-search'/>
                                        </Button>
                                    </Dropdown>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {searchOpen ? <InputGroup style={{marginBottom: 30}}>
                            <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                            <FormInput value={searchUserContent} placeholder="Search for registered users" onChange={(e) => setSearchUserContent(e.target.value)}/>
                        </InputGroup> : ''}
                        {isFirstLoading ? loading : finalFilteredUserAccountsAfterSearch.map(item => (
                            <UserRow triggerReload={() => setIsTriggerReload(!isTriggerReload)} academicTitle={item.academicTitle} managerTitle={item.managerTitle} unionTitle={item.unionTitle}
                                     impactScore={item.impactScore} givenName={item.givenName} familyName={item.familyName} email={item.email} isAdmin={item.isAdmin} department={item.department}/>
                        ))}
                    </CardBody>
                </Card>
            </Col> : ''}
            {openingPublicationDetails ? <Col md={loggedUser.isAdmin ? 6 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}><span>&nbsp; </span>Research Hours</h5>
                                    <div style={{paddingTop: 10}}>
                                        <Badge theme={approvalFilter ? 'success' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                            setApprovalFilter(!approvalFilter);
                                        }}>Approved &nbsp;<i className="fas fa-check"/> </Badge>
                                        <Badge theme={pendingFilter ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                            setPendingFilter(!pendingFilter);
                                        }}>Pending &nbsp;<i className="fas fa-clock"/> </Badge>
                                    </div>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className='float-right'>
                                    <Dropdown open={publicationDetailsSortingOpen} toggle={() => setPublicationDetailsSortingOpen(!publicationDetailsSortingOpen)} className='mr-2'>
                                        <DropdownToggle theme='light' pill>{publicationDetailsSortBy} &nbsp; <i className="fa fa-sort"/></DropdownToggle>
                                        <DropdownMenu>
                                            {['Recently Added', 'Score Ascending', 'Score Descending', 'Title Ascending', 'Title Descending', 'Date Ascending', 'Date Descending'].map(s =>
                                                <DropdownItem onClick={() => dispatch(saveImpactScorePublicationDetailSortBy(s))}>{s}</DropdownItem>)}
                                        </DropdownMenu>
                                        <Button pill theme='light' style={{marginLeft: 10}} onClick={() => {
                                            if (publicationDetailsSearchOpen) {
                                                dispatch(saveSearchPublicationContent(''));
                                                dispatch(saveImpactScoreSearchPublicationContent(''));
                                            }
                                            setPublicationDetailsSearchOpen(!publicationDetailsSearchOpen);
                                        }}><i className='fa fa-search'/>
                                        </Button>
                                    </Dropdown>
                                    <Button id='exportStatistic' pill theme='light' style={{marginLeft: 3, marginRight: 10}} onClick={() => {
                                        let payload = 'year, required hours, completed hours, progress, completed\n';
                                        researchHoursStatisticByYear.forEach(rh => {
                                            payload += rh.name + ',' + rh.threshold + ',' + rh.hours + ',' + (rh.hours / rh.threshold * 100).toFixed(2) + '%,' + (rh.hours >= rh.threshold ? 'yes' : 'no') + '\n';
                                        })
                                        const dataURI = "data:text/plain;base64," + encodeBase64(payload);
                                        saveAs(dataURI, 'research-hours-statistic-of-' + impactScoreOpeningUserName.replaceAll(' ', '-').toLowerCase() + '.csv');
                                    }}><i className='fa fa-download'/>
                                    </Button>
                                    <i style={{fontSize: 20, marginTop: 10, marginRight: 10, marginLeft: 10, cursor: 'pointer'}} className='fa fa-times' onClick={() => {
                                        dispatch(resetImpactScore());
                                    }}/>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {publicationDetailsSearchOpen ? <InputGroup style={{marginBottom: 30}}>
                            <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                            <FormInput value={searchPublicationContent} placeholder="Search publications, authors, and years" onChange={(e) => {
                                dispatch(saveImpactScoreSearchPublicationContent(e.target.value));
                            }}/>
                        </InputGroup> : ''}
                        <Row>
                            <Col>
                                <div style={{marginBottom: 30, marginRight: 10}}>
                                    <h6 style={{textAlign: 'center'}}>Number of completed research hours over years</h6>
                                    {researchHoursStatisticByYear === null ? <div style={{height: 200, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                                        <ResponsiveContainer width='100%' height={200}>
                                            <LineChart data={researchHoursStatisticByYear}>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <XAxis dataKey="name" padding={{left: 20, right: 20}}/>
                                                <YAxis/>
                                                <Tooltip content={<CustomTooltip/>}/>
                                                <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{r: 5}}/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <PublicationList isForImpactScore={true} approvalFilter={approvalFilter} pendingFilter={pendingFilter}/>
                    </CardBody>
                </Card>
            </Col> : ''}
        </Row>
    );
}
