import {Fragment, useEffect, useState} from 'react';
import {Col, FormCheckbox, Row} from "shards-react";
import {savePublicationDivisions, savePublicationFilterDivisions, saveStatisticsFilterDivisions} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export default function DivisionSelector({pageBeingUsedOn}) {
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
        dispatch(pageBeingUsedOn === 'new-publication' ? savePublicationDivisions(currentDivisions) : (pageBeingUsedOn === 'publications' ? savePublicationFilterDivisions(currentDivisions) : saveStatisticsFilterDivisions(currentDivisions)));
        forceUpdate();
    }
    return (
        <Fragment>
            {pageBeingUsedOn === 'new-publication' ? <h6 style={{marginTop: 20}}>Divisions</h6> : ''}
            {pageBeingUsedOn === 'new-publication' ? <Row>
                <Col>
                    {allowedDivisions.map((item, index) => (
                        index % 2 === 0 ? <FormCheckbox checked={item.isEnable} onChange={() => handleChange(index)}>{item.name}</FormCheckbox> : ''
                    ))}
                </Col>
                <Col>
                    {allowedDivisions.map((item, index) => (
                        index % 2 === 1 ? <FormCheckbox checked={item.isEnable} onChange={() => handleChange(index)}>{item.name}</FormCheckbox> : ''
                    ))}
                </Col>
            </Row> : <Row>
                {allowedDivisions.map((item, index) => (
                    <FormCheckbox
                        checked={item.isEnable}
                        onChange={() => handleChange(index)}>
                        {item.name} &nbsp;&nbsp;
                    </FormCheckbox>
                ))}
            </Row>
            }
        </Fragment>
    )
}

