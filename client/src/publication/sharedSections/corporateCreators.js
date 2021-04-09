import { Fragment} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationCorporateCreators} from "../../redux/actions";

export default function CorporateCreators () {
        const corporateCreators = useSelector(store =>store.publication.corporateCreators);
        const dispatch = useDispatch();
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Corporate Creators &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    dispatch(savePublicationCorporateCreators(corporateCreators.concat({corporateCreator: ''})))
                }}/></h6></div>
                {corporateCreators.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col><FormInput placeholder="Corporate Creators" value={item.corporateCreator} valid={item.corporateCreator.length > 5} onChange={(e) => {
                                    let corporateCreators = corporateCreators;
                                    corporateCreators[index].corporateCreator = e.target.value;
                                    dispatch(savePublicationCorporateCreators(corporateCreators));
                                    this.forceUpdate();
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                dispatch(savePublicationCorporateCreators(corporateCreators.filter((value, key) => key !== index)))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
}