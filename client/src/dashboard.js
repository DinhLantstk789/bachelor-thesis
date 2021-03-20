import {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import NewPublication from "./publication/newPublication";
import Publications from "./publications";

class Dashboard extends Component {
    state = {
        isAddingPublication: false
    }
    switchState = (isAddingPublication) => {
        this.setState({isAddingPublication: isAddingPublication});
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <Row>
                                {this.state.isAddingPublication ? <Button pill theme='success' style={{marginRight: 15}} onClick={() => this.setState({isAddingPublication: false})}>
                                    <i className='fa fa-backward'/>&nbsp; Back
                                </Button> : ''}
                                <h5 style={{marginTop: 10, marginLeft: 10}}>{this.state.isAddingPublication ? 'New Publication' : 'My Publications'}</h5>
                            </Row>
                        </Col>
                        <Col>
                            {this.state.isAddingPublication ? '' : <Row className='float-right'>
                                <Button pill style={{marginRight: 15}} onClick={() => this.setState({isAddingPublication: true})}>
                                    New &nbsp;<i className='fa fa-plus'/>
                                </Button>
                            </Row>}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.state.isAddingPublication ? <NewPublication isAddingPublication={this.switchState}/> : <Publications/>}
                </CardBody>
            </Card>
        )
    }
}

export default Dashboard;