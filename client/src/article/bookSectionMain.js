import {Component, Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {connect} from "react-redux";
import {saveBookSectionTitle} from "../redux/actions";

class BookSectionMain extends Component {
    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 10}}>
                    <h6 style={{marginLeft: 13, marginRight: 30, display: "inline"}}>Page Range</h6>
                    <FormInput type="number" size={"sm"} style={{width: 70}}/>
                    <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                    <FormInput type="number" size={"sm"} style={{width: 70}}/>
                </Row>
                <FormInput type="text" placeholder="Enter Title of Book" value={this.props.bookSectionTitle}  style={{marginTop: 10}} onChange={(e) =>this.props.saveBookSectionTitle(e.target.value)}/>
                <FormInput type="text" placeholder="Enter Place of Publication" style={{marginTop: 10}}/>
                <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}}/>
                <FormInput type="text" placeholder="Enter Number of Pages" style={{marginTop: 10}}/>
                <FormInput type="text" placeholder="Enter Series Name" style={{marginTop: 10}}/>
                {/*<span style={{color: "red"}}>{this.state.ErrorMessage}</span>*/}
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

let mapStateToProps = (store)=>{
    return {bookSectionTitle:store.bookSection.bookSectionTitle};
};
let mapDispatchToProps = {saveBookSectionTitle};
export default connect(mapStateToProps, mapDispatchToProps)(BookSectionMain);