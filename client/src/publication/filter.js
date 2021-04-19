import {Badge, Button, Col, Row, Slider} from "shards-react";
import DivisionSelector from "./sharedSections/divisionSelector";
import {useDispatch, useSelector} from "react-redux";
import {useState} from 'react';
import {resetPublicationFilter, savePublicationFilterFirstTerm, savePublicationFilterSecondTerm, savePublicationFilterYearFrom, savePublicationFilterYearTo, setTriggerReloadAllPublication} from "../redux/actions";

export default function Filter() {
    const yearFrom = useSelector(store => store.filter.yearFrom);
    const yearTo = useSelector(store => store.filter.yearTo);
    const isFirstTerm = useSelector(store => store.filter.isFirstTerm);
    const isSecondTerm = useSelector(store => store.filter.isSecondTerm);
    const dispatch = useDispatch();
    const [rangeValues, setRangeValues] = useState([yearFrom, yearTo]);

    return (
        <div style={{marginBottom: 30}}>
            <div style={{marginRight: 50, marginLeft: 10}}>
                <Row>
                    <Col md={6}>
                        <h6><i className={"fa fa-filter"}/>&nbsp; &nbsp;Years from {yearFrom} to {yearTo}</h6>
                    </Col>
                    <Col md={6} style={{marginTop: -4}}>
                        <div className='float-right'>
                            <Badge theme={isFirstTerm ? 'primary' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                dispatch(savePublicationFilterFirstTerm(!isFirstTerm));
                            }}>First term</Badge>
                            <Badge theme={isSecondTerm ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                dispatch(savePublicationFilterSecondTerm(!isSecondTerm));
                            }}>Second term </Badge>
                        </div>
                    </Col>
                </Row>
                <Slider
                    connect
                    pips={{mode: "steps", stepped: true, density: 5}}
                    onSlide={(e) => {
                        dispatch(savePublicationFilterYearFrom(parseInt(e[0])));
                        dispatch(savePublicationFilterYearTo(parseInt(e[1])));
                    }}
                    start={rangeValues}
                    range={{min: yearFrom, max: yearTo}}
                />
            </div>
            <div style={{marginTop: 60, marginLeft: 20}}>
                <DivisionSelector isOneColumn={true}/>
            </div>
            <div style={{textAlign: 'center', marginTop: 20}}>
                <Button style={{marginRight: 5}} theme='light' pill onClick={() => {
                    dispatch(resetPublicationFilter());
                }}>Reset Filters &nbsp; <i className="fas fa-redo-alt"/></Button>
                <Button style={{marginLeft: 5}} theme='light' pill onClick={() => {
                    dispatch(setTriggerReloadAllPublication(true));
                }}>Apply Selected Filters &nbsp; <i className="fas fa-check"/></Button>
            </div>
        </div>
    )
}