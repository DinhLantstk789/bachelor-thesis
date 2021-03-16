import {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import NewPublication from "./publication/newPublication";
import Publications from "./publications";

class Dashboard extends Component {
    state = {
        newArticle: false
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <Row>
                                {this.state.newArticle ? <Button pill theme='success' style={{marginRight: 15}} onClick={() => this.setState({newArticle: false})}>
                                    <i className='fa fa-backward'/>&nbsp; Back
                                </Button> : ''}
                                <h5 style={{marginTop: 10, marginLeft: 10}}>{this.state.newArticle ? 'New Publication' : 'My Publications'}</h5>
                            </Row>
                        </Col>
                        <Col>
                            {this.state.newArticle ? '' : <Row className='pull-right'>
                                <Button pill style={{marginRight: 15}} onClick={() => this.setState({newArticle: true})}>
                                    New &nbsp;<i className='fa fa-plus'/>
                                </Button>
                            </Row>}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.state.newArticle ? <NewPublication/> : <Publications/>}
                </CardBody>
            </Card>
        )
    }
}

export default Dashboard;