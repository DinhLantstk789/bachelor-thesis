import {Component, Fragment} from 'react';
import {Row} from "shards-react";
import React from "react";
import {Badge} from "shards-react";

class Subject extends Component {
    state = {
        enableAerospace: false,
        enableCommunication: false,
        enableElectronicComputer: false,
        enableMechanics: false,
        enablePhysic: false,
        enableISIJournal: false,
        enableISIConference: false,
        enableIT: false,
        enableScopusJournal: false,
        enableTransTechnology: false,
        enableCivil: false

    }

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}>
                    <h5>Subjects</h5>
                    <Row>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableAerospace ? 'primary' : 'light'} onClick={() => {
                            this.setState({enableAerospace: !this.state.enableAerospace});
                        }}>Aerospace Engineering</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableCommunication ? "primary" : "light"} onClick={() => {
                            this.setState({enableCommunication: !this.state.enableCommunication});
                        }}>Communications</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableElectronicComputer ? "primary" : "light"} onClick={() => {
                            this.setState({enableElectronicComputer: !this.state.enableElectronicComputer});
                        }}>Electronics and Computer Engineering</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableMechanics ? "primary" : "light"} onClick={() => {
                            this.setState({enableMechanics: !this.state.enableMechanics});
                        }}>Engineering Mechanics</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enablePhysic ? "primary" : "light"} onClick={() => {
                            this.setState({enablePhysic: !this.state.enablePhysic});
                        }}>Engineering Physics</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableISIJournal ? "primary" : "light"} onClick={() => {
                            this.setState({enableISIJournal: !this.state.enableISIJournal});
                        }}> ISI-indexed journals</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableISIConference ? "primary" : "light"} onClick={() => {
                            this.setState({enableISIConference: !this.state.enableISIConference});
                        }}>ISI/Scopus indexed conference</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableIT ? "primary" : "light"} onClick={() => {
                            this.setState({enableIT: !this.state.enableIT});
                        }}>Information Technology (IT)</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableScopusJournal ? "primary" : "light"} onClick={() => {
                            this.setState({enableScopusJournal: !this.state.enableScopusJournal});
                        }}>Scopus-indexed journals</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableTransTechnology ? "primary" : "light"} onClick={() => {
                            this.setState({enableTransTechnology: !this.state.enableTransTechnology});
                        }}>Transportation Technology</Badge>
                        <Badge style={{marginLeft: 10, marginTop: 10}} pill theme={this.state.enableCivil ? "primary" : "light"} onClick={() => {
                            this.setState({enableCivil: !this.state.enableCivil});
                        }}>Civil Engineering</Badge>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

export default Subject;