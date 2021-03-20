import {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationCorporateCreators} from "../redux/actions";

class CorporateCreators extends Component {

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Corporate Creators &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    this.props.savePublicationCorporateCreators(this.props.corporateCreators.concat({corporateCreator: ''}))
                }}/></h6></div>
                {this.props.corporateCreators.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col><FormInput placeholder="Corporate Creators" value={item.corporateCreator} valid={item.corporateCreator.length > 5} onChange={(e) => {
                                    let corporateCreators = this.props.corporateCreators;
                                    corporateCreators[index].corporateCreator = e.target.value;
                                    this.props.savePublicationCorporateCreators(corporateCreators);
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                this.props.savePublicationCorporateCreators(this.props.corporateCreators.filter((value, key) => key !== index))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {corporateCreators: store.publication.corporateCreators};
}
let mapDispatchToProps = {savePublicationCorporateCreators};
export default connect(mapStateToProps, mapDispatchToProps)(CorporateCreators);