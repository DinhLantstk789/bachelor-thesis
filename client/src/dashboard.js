import {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import NewPublication from "./publication/newPublication";
import Publications from "./publications";
import {connect} from "react-redux";
import {resetArticle, resetBookSection, resetConference, resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel, setDashboardState} from "./redux/actions";

class Dashboard extends Component {

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
                                }}><i className='fa fa-backward'/>&nbsp; Back
                                </Button> : ''}
                                <h5 style={{marginTop: 10, marginLeft: 10}}>{this.props.displayingPublicationLabel}</h5>
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
                    {this.props.isAddingPublication ? <NewPublication/> : <Publications/>}
                </CardBody>
            </Card>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        isAddingPublication: store.publication.isAddingPublication,
        displayingPublicationLabel: store.publication.displayingPublicationLabel
    };
}
let mapDispatchToProps = {setDashboardState, resetArticle, resetBookSection, resetConference, resetPublication, resetTechnicalReport, saveDisplayingPublicationLabel};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);