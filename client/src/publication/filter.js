import {Button, Slider} from "shards-react";
import DivisionSelector from "./sharedSections/divisionSelector";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {resetPublicationFilter, savePublicationFilterYearFrom, savePublicationFilterYearTo, setTriggerReloadAllPublication, unSelectPublicationFilter} from "../redux/actions";

export default function Filter() {
    const windowHeight = useSelector(store => store.home.windowHeight);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const yearFrom = useSelector(store => store.filter.yearFrom);
    const yearTo = useSelector(store => store.filter.yearTo);
    const dispatch = useDispatch();
    const [range, setRange] = useState([2000, 2020]);

    useEffect(() => {
        dispatch(resetPublicationFilter(loggedUser.divisions));
    }, [])

    return (
        <div>
            <div style={{marginRight: 60, marginLeft: 20}}>
                <h6 style={{textAlign: 'center'}}>Lọc theo các năm từ {yearFrom} đến {yearTo}</h6>
                <Slider
                    connect
                    pips={{mode: "steps", stepped: true, density: 5}}
                    onSlide={(e) => {
                        setRange([parseInt(e[0]), parseInt(e[1])]);
                        dispatch(savePublicationFilterYearFrom(parseInt(e[0])));
                        dispatch(savePublicationFilterYearTo(parseInt(e[1])));
                    }}
                    start={range}
                    range={{min: 2000, max: 2020}}
                />
            </div>
            {loggedUser.isAdmin ?
                <div style={{marginTop: 60, marginLeft: 20, overflow: "scroll", height: windowHeight - 660}}>
                    <DivisionSelector pageBeingUsedOn='publications'/>
                </div> : ''}
            <div style={{textAlign: 'center', marginTop: 30}}>
                {loggedUser.isAdmin ?
                    <span>
                        <Button style={{marginRight: 5}} theme='light' pill onClick={() => {
                            setRange([2000, 2021]);
                            dispatch(unSelectPublicationFilter(loggedUser.divisions));
                        }}>Unselect All &nbsp;<i className="fas fa-ban"/></Button>
                        <Button style={{marginLeft: 5, marginRight: 5}} theme='light' pill onClick={() => {
                            setRange([2000, 2021]);
                            dispatch(resetPublicationFilter(loggedUser.divisions));
                        }}>Reset Filters &nbsp;<i className="fas fa-redo-alt"/></Button>
                    </span> : ''
                }
                <Button style={{marginLeft: 5}} theme='light' pill onClick={() => {
                    dispatch(setTriggerReloadAllPublication(true));
                }}>Apply Filters &nbsp;<i className="fas fa-check"/></Button>
            </div>
        </div>
    )
}