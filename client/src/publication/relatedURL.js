import {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationRelatedURL} from "../redux/actions";

class RelatedURL extends Component {
    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6 style={{display: "inline"}}>Related URLs &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    this.props.savePublicationRelatedURL(this.props.relatedURLs.concat({URL: '', URLType: ''}))
                }}/></h6></div>
                {this.props.relatedURLs.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col style={{marginLeft: 0, marginRight: -10}}><FormInput placeholder="URL" value={item.URL} valid={item.URL.length > 5} onChange={(e) => {
                                    let relatedURLs = this.props.relatedURLs;
                                    relatedURLs[index].URL = e.target.value;
                                    this.props.savePublicationRelatedURL(relatedURLs);
                                    this.forceUpdate()
                                }}/></Col>
                                <Col style={{marginLeft: -10, marginRight: 0}}><FormInput placeholder="URL Type" value={item.URLType} valid={item.URLType.length > 5} onChange={(e) => {
                                    let relatedURLs = this.props.relatedURLs;
                                    relatedURLs[index].URLType = e.target.value;
                                    this.props.savePublicationRelatedURL(relatedURLs);
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                this.props.savePublicationRelatedURL(this.props.relatedURLs.filter((value, key) => key !== index))
                            }/>
                        </Col>

                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {relatedURLs: store.publication.relatedURLs};
}
let mapDispatchToProps = {savePublicationRelatedURL};
export default connect(mapStateToProps, mapDispatchToProps)(RelatedURL);