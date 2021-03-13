import {Component, Fragment} from 'react';
import ReferredArticle from "./referredArticle";
import {Col, FormInput, Row} from "shards-react";
import {connect} from "react-redux";

class Book extends Component {
    render() {
        return (
            <Fragment>
                <ReferredArticle/>
                <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                <FormInput placeholder="Enter Publisher" style={{marginTop: 10}}/>
                <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                <FormInput placeholder="Enter Series Name" style={{marginTop: 10}}/>
                <span style={{color: "red"}}>{this.state.ErrorMessage}</span>
                <Row style={{marginTop: 10}}>
                    <Col style={{marginLeft: 0, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter ISBN" onChange={this.onTypingISSN}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter Volume"/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: 0}}>
                        <FormInput type="text" placeholder="Enter Number"/>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {type: store.article.articleType};
}
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Book);