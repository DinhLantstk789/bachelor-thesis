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
import Article from "./article/article";
import ArticleDetails from "./article/articleDetails";


class Dashboard extends Component {
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
                            <CardImg bottom src="./images/logo.png" style={{width: 200, marginTop: 25, marginLeft: 50}}/>
                        </Col>
                        <Col xs={5} md={5} sm={5}>
                            <Row className="pull-right">
                                <DropdownToggle id="dropdown">Home</DropdownToggle>
                                <DropdownToggle id="dropdown">About</DropdownToggle>
                                <Dropdown open={this.state.open} toggle={this.toggle}>
                                    <DropdownToggle id="dropdown" className="pull-right">Browse <i className={"fa fa-angle-down"}/></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Browse by Year</DropdownItem>
                                        <DropdownItem>Browse by Subject</DropdownItem>
                                        <DropdownItem>Browse by Division</DropdownItem>
                                        <DropdownItem>Browse by Author </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownToggle id="dropdown" style={{fontSize: 20}} className="pull-right"><i className={"fa fa-user"}/></DropdownToggle>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownToggle id="dropdown" style={{fontSize: 20, marginRight: 30}}><i className={"fa fa-cogs"}/></DropdownToggle>
                                </Dropdown>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
                <Row style={{marginRight: 150, marginLeft: 150}}>
                    <Col>
                        <Card style={{margin: 30}}>
                            <CardBody>
                                <ArticleDetails/>
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
