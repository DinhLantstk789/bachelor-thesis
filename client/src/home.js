import {Component, Fragment} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "shards-react";
import Footer from "./footer";
import Dashboard from "./dashboard";
import Statistics from "./statistics";
import Profile from "./account/profile";
import {connect} from "react-redux";
import UserManagement from "./account/userManagement";

class Home extends Component {
    state = {
        viewProfile: false,
        userManagement: false
    }

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.state = {openAccount: false};

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
                                {this.props.loggedUser.isAdmin ? <Button onClick={() => {
                                    this.setState({userManagement:true})
                                }}>User Management</Button> : ''}
                                <Dropdown open={this.state.open} toggle={() => this.setState({open: !this.state.open})} style={{paddingRight: 30}}>
                                    <DropdownToggle id="dropdown" className="float-right">Browse <i className={"fa fa-angle-down"}/></DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Browse by Year</DropdownItem>
                                        <DropdownItem>Browse by Subject</DropdownItem>
                                        <DropdownItem>Browse by Division</DropdownItem>
                                        <DropdownItem>Browse by Author </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown open={this.state.openAccount} toggle={() => this.setState({openAccount: !this.state.openAccount})}>
                                    <DropdownToggle id="dropdown1" style={{fontSize: 20, marginRight: 30}} className="float-right"><i className={"fa fa-user"}/></DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={() => this.setState({viewProfile: true})}><i className="fas fa-user-circle"/>&nbsp;&nbsp;See your profile</DropdownItem>
                                        <DropdownItem><i className="fas fa-cogs"/>&nbsp;&nbsp;Settings</DropdownItem>
                                        <DropdownItem><i className="fas fa-sign-out"/>&nbsp;&nbsp;Log Out</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
                {this.state.userManagement ? <UserManagement/>:
                <Row style={{marginLeft: 20}}>
                    <Col md={8}>
                        {this.state.viewProfile ? <Profile/> : <Dashboard/>}
                    </Col>
                    <Col md={4}>
                        <Statistics/>
                    </Col>
                </Row>}
                <Footer/>
            </Fragment>
        )
    }
}


let mapStateToProps = (store) => {
    return {loggedUser: store.user.loggedUser}
};
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
