import React, {useEffect, useState} from "react";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Badge, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormCheckbox, Row} from "shards-react";
import {List} from "react-content-loader";
import {fetchPublication} from "../utils/apiCalls";
import {ClipLoader} from "react-spinners";
import {resetStatisticFilter, setTriggerReloadAllStatistics, unSelectStatisticFilter} from "../redux/actions";
import DivisionSelector from "../publication/sharedSections/divisionSelector";
import {useDispatch, useSelector} from "react-redux";

export default function Statistics() {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const filteredDivisions = useSelector(store => store.statistics.divisions);
    const triggerReloadAllStatistics = useSelector(store => store.statistics.triggerReloadAllStatistics);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isCumulativeStats, setIsCumulativeStats] = useState(false);

    const [publications, setPublications] = useState(null);
    const [statisticData, setStatisticData] = useState(null);
    const [rawStatisticData, setRawStatisticData] = useState(null);
    const [cumulativeStatisticData, setCumulativeStatisticData] = useState(null);

    const [statisticYears, setStatisticYears] = useState([]); /* year -> {article: 1, conference: 3...|| [{name: 'article', count: 10},{name: 'article', count: 10}]}*/
    const [selectedFilterByYear, setSelectedFilterByYear] = useState(null);
    const [selectingYearOpen, setSelectingYearOpen] = useState(false);

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            let currentPoint = null;
            let totalPublications = 0;
            if (isCumulativeStats) {
                cumulativeStatisticData.forEach(d => {
                    if (label === d.name) currentPoint = d;
                })
            } else {
                statisticData.forEach(d => {
                    if (label === d.name) currentPoint = d;
                })
            }
            allPublicationTypes.forEach(t => totalPublications += currentPoint[t]);
            return (
                <div style={{backgroundColor: '#FFFFFF', opacity: 0.6, padding: 10}}>
                    <h5 className="label">{`Total publications in ${label}: ${totalPublications}`}</h5>
                    <h6 style={{marginBottom: 10, marginTop: 15}}><i className='fa fa-check'/>&nbsp; By semesters</h6>
                    <b>First term: </b>{currentPoint.firstTerm} {Math.round(currentPoint.firstTerm / (currentPoint.firstTerm + currentPoint.secondTerm) * 100).toFixed(2)}%<br/>
                    <b>Second term: </b>{currentPoint.secondTerm} {Math.round(currentPoint.secondTerm / (currentPoint.firstTerm + currentPoint.secondTerm) * 100).toFixed(2)}%<br/>
                    <h6 style={{marginBottom: 10, marginTop: 15}}><i className='fa fa-check'/>&nbsp; By publication types</h6>
                    {allPublicationTypes.slice(0).reverse().map((t, i) => (<div>
                        <Badge style={{width: 50, marginRight: 15, marginBottom: 5, backgroundColor: allPublicationColor[allPublicationTypes.length - 1 - i]}}>
                            &nbsp;&nbsp;
                        </Badge>
                        <b>{t}: </b>{currentPoint[t]}<br/>
                    </div>))}
                </div>
            );
        }
        return null;
    };

    const allPublicationTypes = ['article', 'conference-workshop-item', 'technical-report', 'book-section', 'book', 'thesis', 'patent', 'image', 'video', 'dataset', 'experiment', 'teaching-resource', 'project-grant'];
    const allPublicationColor = ['#8884d8', '#82ca9d', '#ffc658', '#E0B474', '#AFB0A8', '#9B6155', '#DE8C64', '#2F3330', '#5BCCDE', '#5F5490', '#AD5C73', '#F1C773', '#EF622F'];

    const parseStats = (publications) => {
        const years = [];
        const publicationYearCount = {}; /* year -> {count firstTerm, secondTerm, article, ...} */
        const publicationYearCumulativeCount = {};
        let minYear = 3000, maxYear = 0;
        publications.forEach(p => {
            const y = parseInt(p.selectedDate.split('-')[0]);
            minYear = y < minYear ? y : minYear;
            maxYear = y > maxYear ? y : maxYear;
        });
        for (let y = minYear; y <= maxYear; y++) {
            years.push(y);
            publicationYearCount[y] = {name: y, firstTerm: 0, secondTerm: 0};
            publicationYearCumulativeCount[y] = {name: y, firstTerm: 0, secondTerm: 0};
            allPublicationTypes.forEach(t => {
                publicationYearCount[y][t] = 0;
                publicationYearCumulativeCount[y][t] = 0;
            });
        }
        setStatisticYears(years);
        setSelectedFilterByYear(years.length > 0 ? years[0] : null);
        publications.forEach(p => {
            const y = parseInt(p.selectedDate.split('-')[0]), m = parseInt(p.selectedDate.split('-')[1]), type = p.type;
            for (let i = 0; i < allPublicationTypes.length; i++) {
                if (type === allPublicationTypes[i]) {
                    publicationYearCount[y][type] = publicationYearCount[y][type] + 1;
                    publicationYearCumulativeCount[y][type] = publicationYearCumulativeCount[y][type] + 1;
                    break;
                }
            }
            if (m <= 6) {
                publicationYearCount[y].firstTerm = publicationYearCount[y].firstTerm + 1;
                publicationYearCumulativeCount[y].firstTerm = publicationYearCumulativeCount[y].firstTerm + 1;
            } else {
                publicationYearCount[y].secondTerm = publicationYearCount[y].secondTerm + 1;
                publicationYearCumulativeCount[y].secondTerm = publicationYearCumulativeCount[y].secondTerm + 1;
            }
        });

        /* find data per types */
        for (let y = minYear; y <= maxYear; y++) {
            let dataPerType = [];
            allPublicationTypes.forEach(t => {
                dataPerType.push({name: t, publications: publicationYearCount[y][t]});
            });
            publicationYearCount[y].dataPerType = dataPerType;
        }
        /* sum publications per types all the time */
        let dataPerTypeSum = [];
        allPublicationTypes.forEach(t => {
            let sumCountOfType = 0;
            for (let y = minYear; y <= maxYear; y++) {
                publicationYearCount[y].dataPerType.forEach(ttt => {
                    if (ttt.name === t) sumCountOfType += ttt.publications;
                });
            }
            dataPerTypeSum.push({name: t, publications: sumCountOfType});
        });
        // publicationYearCount['All Years'] = {dataPerType:dataPerTypeSum};

        /* store to state */
        setRawStatisticData(publicationYearCount);
        setStatisticData(Object.keys(publicationYearCount).map(year => publicationYearCount[year]));

        /* cumulative statistics */
        for (let y = minYear; y <= maxYear; y++) {
            if (y !== minYear) {
                publicationYearCumulativeCount[y].name = y;
                publicationYearCumulativeCount[y].firstTerm = publicationYearCumulativeCount[y].firstTerm + publicationYearCumulativeCount[y - 1].firstTerm;
                publicationYearCumulativeCount[y].secondTerm = publicationYearCumulativeCount[y].secondTerm + publicationYearCumulativeCount[y - 1].secondTerm;
                allPublicationTypes.forEach(t => {
                    publicationYearCumulativeCount[y][t] = publicationYearCumulativeCount[y][t] + publicationYearCumulativeCount[y - 1][t];
                });
            }
        }
        setCumulativeStatisticData(Object.keys(publicationYearCumulativeCount).map(year => publicationYearCumulativeCount[year]));
    }

    useEffect(() => {
        if (triggerReloadAllStatistics) {
            setIsLoading(true);
            setPublications(null);
            setStatisticData(null);
            setRawStatisticData(null);
            setCumulativeStatisticData(null);
            setStatisticYears([]);
            setSelectedFilterByYear(null);
            dispatch(setTriggerReloadAllStatistics(false));
            const body = {
                isFiltering: true,
                filteredDivisions: filteredDivisions
            }
            fetchPublication(body, (publications) => {
                setPublications(publications);
                parseStats(publications);
                setIsLoading(false);
            }, (message) => alert(message));
        }
    });

    useEffect(() => {
        dispatch(resetStatisticFilter(loggedUser.divisions));
        const body = {
            isFiltering: true,
            filteredDivisions: filteredDivisions
        }
        fetchPublication(body, (publications) => {
            setIsLoading(false);
            setPublications(publications);
            parseStats(publications);
        }, (message) => alert(message));
    }, []);


    let loading = <div style={{marginLeft: 30}}>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>

    return (
        <Row style={{marginLeft: 20}}>
            <Col md={8}>
                <Card>
                    <CardHeader>
                        <Row style={{marginLeft: 10, marginRight: 0, marginTop: 10}}>
                            <Col md={8}>
                                <h5>Number of publications across different types over time</h5>
                            </Col>
                            <Col md={4}>
                                <Row className='float-right'>
                                    <h6 style={{marginRight: 15, marginTop: 2}}>Cumulative</h6>
                                    <FormCheckbox toggle checked={isCumulativeStats} onChange={() => setIsCumulativeStats(!isCumulativeStats)}/>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody style={{paddingRight: 40, paddingLeft: 0}}>
                        {isLoading ? loading : <div>
                            <ResponsiveContainer width='100%' height={650}>
                                <AreaChart data={isCumulativeStats ? cumulativeStatisticData : statisticData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name" padding={{left: 20, right: 20}}/>
                                    <YAxis/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    {allPublicationTypes.map((t, i) => (<Area type="monotone" dataKey={t} stackId="1" stroke={allPublicationColor[i]} fill={allPublicationColor[i]}/>))}
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>}
                    </CardBody>
                </Card>
            </Col>
            <Col md={4}>
                <div style={{marginRight: 50, marginBottom: 20}}>
                    <div style={{textAlign: 'center'}}>
                        <Dropdown open={selectingYearOpen} toggle={() => setSelectingYearOpen(!selectingYearOpen)} className='mr-2'>
                            <Row style={{marginBottom: 10}}>
                                <Col md={7}><h6 style={{textAlign: 'center', marginTop: 10, marginLeft: 15}}><span style={{marginRight: 20}}>Number of publications by types</span></h6></Col>
                                <Col md={5}>
                                    <Row className='float-right'>
                                        <DropdownToggle theme='light' pill>Selected Year {selectedFilterByYear}&nbsp; <i className="fa fa-sort"/></DropdownToggle>
                                        <DropdownMenu>
                                            {statisticYears.map(y => <DropdownItem onClick={() => {
                                                setSelectedFilterByYear(y);
                                            }}>{y}</DropdownItem>)}
                                        </DropdownMenu>
                                    </Row>
                                </Col>
                            </Row>
                        </Dropdown>
                    </div>
                    {statisticData === null ? <div style={{height: 300, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                        (!rawStatisticData[selectedFilterByYear]) ? <div style={{height: 300}}>
                        </div> : <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={rawStatisticData[selectedFilterByYear].dataPerType}
                                barSize={20}>
                                <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}} style={{fontSize: '0.9rem'}}/>
                                <YAxis/>
                                <Tooltip/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Bar dataKey="publications" fill="#8884d8" background={{fill: '#eee'}}/>
                            </BarChart>
                        </ResponsiveContainer>
                    }
                    <div style={{marginTop: 30, marginLeft: 55}}>
                        <DivisionSelector pageBeingUsedOn='statistics'/>
                    </div>
                    <div style={{textAlign: 'center', marginTop: 20}}>
                        <Button style={{marginRight: 5}} theme='light' pill onClick={() => {
                            dispatch(unSelectStatisticFilter(loggedUser.divisions));
                        }}>Unselect All &nbsp;<i className="fas fa-ban"/></Button>
                        <Button style={{marginLeft: 5, marginRight: 5}} theme='light' pill onClick={() => {
                            dispatch(resetStatisticFilter(loggedUser.divisions));
                        }}>Reset Filters &nbsp;<i className="fas fa-redo-alt"/></Button>
                        <Button style={{marginLeft: 5}} theme='light' pill onClick={() => {
                            dispatch(setTriggerReloadAllStatistics(true));
                        }}>Apply Filters &nbsp;<i className="fas fa-check"/></Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
}