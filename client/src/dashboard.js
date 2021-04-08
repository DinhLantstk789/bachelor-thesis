import {Component} from 'react';
import {Badge, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "shards-react";
import NewPublication from "./publication/newPublication";
import Publications from "./publications";
import {connect} from "react-redux";
import {publicationApprovingCheck, resetArticle, resetBookSection, resetConference, resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel, saveViewingPublicationId, setDashboardState} from "./redux/actions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

        if (this.props.loggedUser.isAdmin) {
            this.state.approvalFilter = false;
            this.state.pendingFilter = true;
        } else {
            this.state.approvalFilter = true;
            this.state.pendingFilter = false;
        }
        // let checkApproval = this.props.loggedUser.isAdmin ? false : (this.props.isApprovedPublication === 'approved' ? true : false);
    }


    render() {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <Row>
                                {this.props.isAddingPublication ? <Button pill theme='success' style={{marginRight: 15}} onClick={() => {
                                    this.props.setDashboardState(false);
                                    this.props.resetArticle();
                                    this.props.resetBookSection();
                                    this.props.resetConference();
                                    this.props.resetPublication();
                                    this.props.resetTechnicalReport();
                                    this.props.saveDisplayingPublicationLabel('My Publication');
                                    this.props.saveViewingPublicationId(null);
                                }}><i className='fa fa-backward'/>&nbsp; Back
                                </Button> : ''}
                                <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>{this.props.displayingPublicationLabel}</h5>
                                <div style={{paddingTop: 10}}>
                                    <Badge theme={this.state.approvalFilter ? 'primary' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 15, paddingRight: 15}} onClick={(e) => {
                                        this.setState({approvalFilter: !this.state.approvalFilter});
                                    }}>Approved</Badge>
                                    <Badge theme={this.state.pendingFilter ? 'primary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 15, paddingRight: 15}} onClick={(e) => {
                                        this.setState({pendingFilter: !this.state.pendingFilter});
                                    }}>Pending</Badge>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            {this.props.isAddingPublication ? '' : <Row className='float-right'>
                                <Button pill style={{marginRight: 15}} onClick={() => {
                                    this.props.setDashboardState(true);
                                    this.props.saveDisplayingPublicationLabel('New Publication');
                                }}>New &nbsp;<i className='fa fa-plus'/>
                                </Button>
                            </Row>}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.props.isAddingPublication ? <NewPublication/> : <Publications approvalFilter={this.state.approvalFilter} pendingFilter={this.state.pendingFilter}/>}
                </CardBody>
            </Card>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        loggedUser: store.user.loggedUser,
        isAddingPublication: store.publication.isAddingPublication,
        displayingPublicationLabel: store.publication.displayingPublicationLabel
    };
}
let mapDispatchToProps = {
    setDashboardState, resetArticle, resetBookSection, resetConference,
    resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel, saveViewingPublicationId, publicationApprovingCheck
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);