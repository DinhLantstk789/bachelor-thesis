import {Component, Fragment} from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Button, Alert, Row, Col, CardImg,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "shards-react";
import Footer from "./footer";
import Article from "./article/artile";

class Dashboard extends Component {
    state = {
        loggedUser: null
    }

    static getDerivedStateFromProps(newProps, prevState) {
        return {loggedUser: newProps.loggedUser};
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {open: false};
    }

    toggle() {
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
                            <CardImg bottom src="./images/logo.png" style={{width:200,marginTop:25,marginLeft:50}}/>
                        </Col>
                        <Col xs={5} md={5} sm={5} >
                            <Row className="pull-right">
                                <DropdownToggle  id="dropdown" >Home</DropdownToggle>
                                <DropdownToggle  id="dropdown">About</DropdownToggle>
                                <Dropdown open={this.state.open} toggle={this.toggle}>
                                    <DropdownToggle  id="dropdown"className="pull-right">Browse <i className={"fa fa-angle-down"}></i></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Browse by Year</DropdownItem>
                                        <DropdownItem>Browse by Subject</DropdownItem>
                                        <DropdownItem>Browse by Division</DropdownItem>
                                        <DropdownItem>Browse by Author </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownToggle  id="dropdown" style={{fontSize: 20}} className="pull-right"><i className={"fa fa-user"}></i></DropdownToggle>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownToggle  id="dropdown" style={{fontSize: 20,marginRight:30}}><i className={"fa fa-cogs"}></i></DropdownToggle>
                                </Dropdown>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
                <Row style={{marginRight: 150, marginLeft: 150}}>
                    <Col>
                        <Card style={{margin: 30}}>
                            <CardHeader>
                            </CardHeader>
                            <CardBody>
                                <Article loggedUser={this.state.loggedUser}/>
                            </CardBody>
                            <Footer/>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Dashboard;
