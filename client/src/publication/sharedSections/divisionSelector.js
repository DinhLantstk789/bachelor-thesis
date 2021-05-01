import React, {Fragment, useState} from 'react';
import {Col, FormCheckbox, Row} from "shards-react";
import {savePublicationDivisions, savePublicationFilterDivisions, saveStatisticsFilterDivisions} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export default function DivisionSelector({pageBeingUsedOn}) {
    const [openingDivisions, setOpeningDivisions] = useState({});
    const allowedDivisions = useSelector(store => (pageBeingUsedOn === 'new-publication' ? store.publication.divisions : (pageBeingUsedOn === 'publications' ? store.filter.divisions : store.statistics.divisions)));

    const dispatch = useDispatch();
    const useForceUpdate = () => {
        const set = useState(0)[1];
        return () => set((s) => s + 1);
    };
    const forceUpdate = useForceUpdate();

    let handleChange = (index) => {
        let currentDivisions = allowedDivisions;
        currentDivisions[index].isEnable = !currentDivisions[index].isEnable;
        let condition = currentDivisions[index].name.includes('(');
        if (pageBeingUsedOn === 'new-publication') {
            condition = condition && !currentDivisions[index].isEnable;
        }
        if (condition) {
            for (let i = 0; i < currentDivisions.length; i++) {
                if (currentDivisions[index].name.split('(')[1].includes(currentDivisions[i].name.split(':')[0])) {
                    currentDivisions[i].isEnable = currentDivisions[index].isEnable;
                }
            }
        } else {
            if (currentDivisions[index].name.includes(':') && pageBeingUsedOn === 'new-publication' && currentDivisions[index].isEnable) {
                for (let i = 0; i < currentDivisions.length; i++) {
                    if (currentDivisions[i].name.includes('(' + currentDivisions[index].name.split(':')[0] + ')')) {
                        currentDivisions[i].isEnable = currentDivisions[index].isEnable;
                    }
                }
            }
        }
        dispatch(pageBeingUsedOn === 'new-publication' ? savePublicationDivisions(currentDivisions) : (pageBeingUsedOn === 'publications' ? savePublicationFilterDivisions(currentDivisions) : saveStatisticsFilterDivisions(currentDivisions)));
        forceUpdate();
    }

    return (
        <Fragment>
            {pageBeingUsedOn === 'new-publication' ? <h6 style={{marginTop: 20}}>Divisions</h6> : ''}
            {pageBeingUsedOn === 'new-publication' ? <Row>
                <Col>
                    {allowedDivisions.map((item, index) => (
                        <div style={{marginLeft: item.name.includes(':') ? 30 : 0}}>
                            {item.name.includes(':') && !openingDivisions[item.name.split(':')[0]] ? '' :
                                index >= allowedDivisions.length / 2 + 1 ?
                                    <FormCheckbox checked={item.isEnable} onChange={() => handleChange(index)}>
                                        {item.name.includes(':') ? item.name.split(':')[1].trim() : item.name}
                                        {item.name.includes('(') ? <i style={{marginLeft: 15}} className={openingDivisions[item.name.split('(')[1].split(')')[0]] ? 'fas fa-chevron-down' : 'fas fa-chevron-right'} onClick={() => {
                                            let crrOpeningDivisions = openingDivisions;
                                            const key = item.name.split('(')[1].split(')')[0];
                                            crrOpeningDivisions[key] = !crrOpeningDivisions[key] ? true : !crrOpeningDivisions[key];
                                            setOpeningDivisions(crrOpeningDivisions);
                                        }
                                        }/> : ''}
                                    </FormCheckbox> : ''
                            }
                        </div>
                    ))}
                </Col>
                <Col>
                    {allowedDivisions.map((item, index) => (
                        <div style={{marginLeft: item.name.includes(':') ? 30 : 0}}>
                            {item.name.includes(':') && !openingDivisions[item.name.split(':')[0]] ? '' :
                                index < allowedDivisions.length / 2 + 1 ?
                                    <FormCheckbox checked={item.isEnable} onChange={() => handleChange(index)}>
                                        {item.name.includes(':') ? item.name.split(':')[1].trim() : item.name}
                                        {item.name.includes('(') ? <i style={{marginLeft: 15}} className={openingDivisions[item.name.split('(')[1].split(')')[0]] ? 'fas fa-chevron-down' : 'fas fa-chevron-right'} onClick={() => {
                                            let crrOpeningDivisions = openingDivisions;
                                            const key = item.name.split('(')[1].split(')')[0];
                                            crrOpeningDivisions[key] = !crrOpeningDivisions[key] ? true : !crrOpeningDivisions[key];
                                            setOpeningDivisions(crrOpeningDivisions);
                                        }
                                        }/> : ''}
                                    </FormCheckbox> : ''
                            }
                        </div>
                    ))}
                </Col>
            </Row> : <div>
                {allowedDivisions.map((item, index) => (
                    <div style={{marginLeft: item.name.includes(':') ? 30 : 0}}>
                        {item.name.includes(':') && !openingDivisions[item.name.split(':')[0]] ? '' :
                            <FormCheckbox checked={item.isEnable} onChange={() => handleChange(index)}>
                                {item.name.includes(':') ? item.name.split(':')[1].trim() : item.name}
                                {item.name.includes('(') ? <i style={{marginLeft: 15}} className={openingDivisions[item.name.split('(')[1].split(')')[0]] ? 'fas fa-chevron-down' : 'fas fa-chevron-right'} onClick={() => {
                                    let crrOpeningDivisions = openingDivisions;
                                    const key = item.name.split('(')[1].split(')')[0];
                                    crrOpeningDivisions[key] = !crrOpeningDivisions[key] ? true : !crrOpeningDivisions[key];
                                    setOpeningDivisions(crrOpeningDivisions);
                                }
                                }/> : ''}
                            </FormCheckbox>
                        }
                    </div>
                ))}
            </div>
            }
        </Fragment>
    )
}

