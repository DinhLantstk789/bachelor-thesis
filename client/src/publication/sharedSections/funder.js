import { Fragment} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import { savePublicationFunders} from "../../redux/actions";

export default function Funder () {
    const funders = useSelector(store => store.publication.funders);
    const dispatch = useDispatch();
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Funders &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    dispatch(savePublicationFunders(this.props.funders.concat({funder: ''})))
                }}/></h6></div>
                {funders.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col><FormInput placeholder="Funder" value={item.funder} valid={item.funder.length > 5} onChange={(e) => {
                                    funders[index].funder = e.target.value;
                                    dispatch(savePublicationFunders(funders));
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                dispatch(savePublicationFunders(funders.filter((value, key) => key !== index)))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
}


