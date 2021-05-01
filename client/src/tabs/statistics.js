import React, {useEffect, useState} from "react";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {Badge, Button, Card, CardBody, CardHeader, Col, FormCheckbox, Row} from "shards-react";
import {List} from "react-content-loader";
import {fetchPublication} from "../utils/apiCalls";
import {ClipLoader} from "react-spinners";
import {resetStatisticFilter, setTriggerReloadAllStatistics, unSelectStatisticFilter} from "../redux/actions";
import DivisionSelector from "../publication/sharedSections/divisionSelector";
import {useDispatch, useSelector} from "react-redux";
import YearSelector from "../publication/yearSelector";
import {allPublicationColor, allPublicationTypes} from "../utils/configs";

export default function Statistics() {
    const windowHeight = useSelector(store => store.home.windowHeight);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const filteredDivisions = useSelector(store => store.statistics.divisions);
    const triggerReloadAllStatistics = useSelector(store => store.statistics.triggerReloadAllStatistics);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isCumulativeStats, setIsCumulativeStats] = useState(false);

    const [statisticData, setStatisticData] = useState(null);
    const [rawStatisticData, setRawStatisticData] = useState(null);
    const [cumulativeStatisticData, setCumulativeStatisticData] = useState(null);
    const yearRange = useSelector(store => store.home.yearsRange);
    const [selectedFilterByYear, setSelectedFilterByYear] = useState(yearRange[yearRange.length - 1]);

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
                    <h5 className="label">{`Số lượng bài báo năm ${label}: ${totalPublications}`}</h5>
                    <h6 style={{marginBottom: 10, marginTop: 15}}><i className='fa fa-check'/>&nbsp; Theo học kỳ</h6>
                    <b>Học kỳ 1: </b>{currentPoint.firstTerm} {Math.round(currentPoint.firstTerm / (currentPoint.firstTerm + currentPoint.secondTerm) * 100).toFixed(2)}%<br/>
                    <b>Học kỳ 2: </b>{currentPoint.secondTerm} {Math.round(currentPoint.secondTerm / (currentPoint.firstTerm + currentPoint.secondTerm) * 100).toFixed(2)}%<br/>
                    <h6 style={{marginBottom: 10, marginTop: 15}}><i className='fa fa-check'/>&nbsp; Theo thể loại</h6>
                    {allPublicationTypes.slice(0).reverse().map((t, i) => (<div>
                        <Badge style={{width: 50, marginRight: 15, marginBottom: 5, backgroundColor: allPublicationColor[allPublicationTypes.length - 1 - i]}}>&nbsp;&nbsp;</Badge>
                        <b>{t}: </b>{currentPoint[t]}<br/>
                    </div>))}
                </div>
            );
        }
        return null;
    };


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
            setStatisticData(null);
            setRawStatisticData(null);
            setCumulativeStatisticData(null);
            setSelectedFilterByYear(null);
            dispatch(setTriggerReloadAllStatistics(false));
            const body = {
                isFiltering: true,
                filteredDivisions: filteredDivisions
            }
            fetchPublication(body, (publications) => {
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
            parseStats(publications);
            setSelectedFilterByYear(yearRange[yearRange.length - 1])
        }, (message) => alert(message));
    }, []);

    return (
        <Row style={{marginLeft: 20}}>
            <Col md={8}>
                <Card>
                    <CardHeader>
                        <Row style={{marginLeft: 10, marginRight: 0, marginTop: 10}}>
                            <Col md={8}>
                                <h5>Số lượng công bố khoa học qua các năm</h5>
                            </Col>
                            <Col md={4}>
                                <Row className='float-right'>
                                    <h6 style={{marginRight: 15, marginTop: 2}}>Cộng dồn các năm</h6>
                                    <FormCheckbox toggle checked={isCumulativeStats} onChange={() => setIsCumulativeStats(!isCumulativeStats)}/>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody style={{paddingRight: 40, paddingLeft: 0}}>
                        {isLoading ? <div style={{marginLeft: 30, width: 1000}}><List/><List style={{marginTop: 20}}/></div> : <div>
                            <ResponsiveContainer width='100%' height={windowHeight - 340}>
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
                    <Row style={{marginBottom: 10}}>
                        <Col><h6 style={{textAlign: 'left', marginTop: 10, marginLeft: 30}}><span>Số lượng công bố mỗi năm theo thể loại</span></h6></Col>
                        <Row className='float-right' style={{marginRight: 10}}>
                            <YearSelector onSelected={(y) => setSelectedFilterByYear(y)}/>
                        </Row>
                    </Row>
                    {statisticData === null ? <div style={{height: 300, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                        (!rawStatisticData[selectedFilterByYear]) ? <div>
                        </div> : <ResponsiveContainer width="100%" height={225}>
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
                    {loggedUser.isAdmin ?
                        <span>
                            <div style={{marginTop: 30, marginLeft: 10, overflow: "scroll", height: windowHeight - 575}}><DivisionSelector pageBeingUsedOn='statistics'/></div>
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
                        </span>
                        : ''}
                </div>
            </Col>
        </Row>
    );
}