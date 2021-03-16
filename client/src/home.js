import {Component, Fragment} from 'react';
import {
    Alert, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "shards-react";
import Footer from "./footer";
import Dashboard from "./dashboard";
import Statistics from "./statistics";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    toggle = () => {
        this.setState(prevState => {
            return {open: !prevState.open};
        });
    }

    render() {
        return (
            <Fragment>
                <Alert id="menuNav">
                    <Row>
                        <Col xs={7} md={7} sm={7}>
                            <img bottom src="./images/logo.png" style={{width: 180, marginTop: 8, marginLeft: 50}}/>
                        </Col>
                        <Col xs={5} md={5} sm={5}>
                            <Row className="float-right">
                                <DropdownToggle id="dropdown">Home</DropdownToggle>
                                <DropdownToggle id="dropdown">About</DropdownToggle>
                                <Dropdown open={this.state.open} toggle={this.toggle}>
                                    <DropdownToggle id="dropdown" className="float-right">Browse <i className={"fa fa-angle-down"}/></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Browse by Year</DropdownItem>
                                        <DropdownItem>Browse by Subject</DropdownItem>
                                        <DropdownItem>Browse by Division</DropdownItem>
                                        <DropdownItem>Browse by Author </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownToggle id="dropdown" style={{fontSize: 20, marginRight: 30}} className="float-right"><i className={"fa fa-user"}/></DropdownToggle>
                                </Dropdown>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
                <Row style={{marginLeft: 20}}>
                    <Col md={8}>
                        <Dashboard/>
                    </Col>
                    <Col md={4}>
                        <Statistics/>
                    </Col>
                </Row>
                <Footer/>
            </Fragment>
        )
    }
}

export default Home;
