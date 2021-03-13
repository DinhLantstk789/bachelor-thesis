import {Component, Fragment} from 'react';
import {Col, FormCheckbox, Row} from "shards-react";

class DivisionSelector extends Component {
    state = {
        AVITECH: false,
        CET: false,
        CETR: false,
        FAT: false,
        FET: false,
        FEMA: false,
        FEPN: false,
        FIT: false,
        NanoLab: false,
        SAE: false,
        SISLAB: false

    }
    handleChange = (e, division) => {
        const newState = {};
        newState[division] = !this.state[division];
        this.setState({...this.state, ...newState});
    }
    render() {
        return (
            <Fragment>
                <h6 style={{marginTop:20}}>Divisions</h6>
                <Row>
                    <Col>
                        <FormCheckbox
                            checked={this.state.AVITECH}
                            onChange={e => this.handleChange(e, "AVITECH")}>
                            Advanced Institute of Engineering and Technology (AVITECH)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.CET}
                            onChange={e => this.handleChange(e, "CET")}>
                            Department of Civil Engineering and Transportation (CET)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.CETR}
                            onChange={e => this.handleChange(e, "CETR")}>
                            Center for Electronics and Telecommunications Research (CETR)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.FAT}
                            onChange={e => this.handleChange(e, "FAT")}>
                            Faculty of Agriculture Technology (FAT)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.FET}
                            onChange={e => this.handleChange(e, "FET")}>
                            Faculty of Electronics and Telecommunications (FET)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.FEMA}
                            onChange={e => this.handleChange(e, "FEMA")}>
                            Faculty of Engineering Mechanics and Automation (FEMA)
                        </FormCheckbox>
                    </Col>
                    <Col>

                        <FormCheckbox
                            checked={this.state.FEPN}
                            onChange={e => this.handleChange(e, "FEPN")}>
                            Faculty of Engineering Physics and Nanotechnology (FEPN)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.FIT}
                            onChange={e => this.handleChange(e, "FIT")}>
                            Faculty of Information Technology (FIT)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.NanoLab}
                            onChange={e => this.handleChange(e, "NanoLab")}>
                            Key Laboratory for Nanotechnology (Nano Lab)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.SAE}
                            onChange={e => this.handleChange(e, "SAE")}>
                            School of Aerospace Engineering (SAE)
                        </FormCheckbox>
                        <FormCheckbox
                            checked={this.state.SISLAB}
                            onChange={e => this.handleChange(e, "SISLAB")}>
                            Key Laboratory for Smart Integrated Systems (SISLAB)
                        </FormCheckbox>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default DivisionSelector;
