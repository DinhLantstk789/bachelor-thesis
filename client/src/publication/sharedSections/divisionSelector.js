import {Fragment, useState} from 'react';
import {Col, FormCheckbox, Row} from "shards-react";
import {savePublicationDivisions} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export default function DivisionSelector() {
    const divisions = useSelector(store => store.publication.divisions);
    const dispatch = useDispatch();
    const useForceUpdate = () => {
        const set = useState(0)[1];
        return () => set((s) => s + 1);
    };
    const forceUpdate = useForceUpdate();

    let handleChange = (index) => {
        let currentDivisions = divisions;
        currentDivisions[index].isEnable = !currentDivisions[index].isEnable;
        dispatch(savePublicationDivisions(currentDivisions));
        forceUpdate();
    }
    return (
        <Fragment>
            <h6 style={{marginTop: 20}}>Divisions</h6>
            <Row>
                <Col>
                    {divisions.map((item, index) => (
                        index % 2 === 0 ?
                            <FormCheckbox
                                checked={item.isEnable}
                                onChange={() => handleChange(index)}>
                                {item.name}
                            </FormCheckbox>
                            : ''
                    ))}
                    </Col>
                    <Col>
                        {divisions.map((item, index) => (
                            index % 2 === 1 ?
                                <FormCheckbox
                                    checked={item.isEnable}
                                    onChange={() => handleChange(index)}>
                                    {item.name}
                                </FormCheckbox>
                                : ''
                        ))}
                    </Col>
                </Row>
            </Fragment>
        )
}

