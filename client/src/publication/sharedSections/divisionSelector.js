import {Component, Fragment} from 'react';
import {Col, FormCheckbox, Row} from "shards-react";
import {savePublicationDivisions} from "../../redux/actions";
import {connect} from "react-redux";

class DivisionSelector extends Component {

    handleChange(index) {
        let currentDivisions = this.props.divisions;
        currentDivisions[index].isEnable = !currentDivisions[index].isEnable;
        savePublicationDivisions(currentDivisions);
        this.forceUpdate();
    }

    render() {
        return (
            <Fragment>
                <h6 style={{marginTop: 20}}>Divisions</h6>
                <Row>
                    <Col>
                        {this.props.divisions.map((item, index) => (
                            index % 2 === 0 ?
                                <FormCheckbox
                                    checked={item.isEnable}
                                    onChange={() => this.handleChange(index)}>
                                    {item.name}
                                </FormCheckbox>
                                : ''
                        ))}
                    </Col>
                    <Col>
                        {this.props.divisions.map((item, index) => (
                            index % 2 === 1 ?
                                <FormCheckbox
                                    checked={item.isEnable}
                                    onChange={() => this.handleChange(index)}>
                                    {item.name}
                                </FormCheckbox>
                                : ''
                        ))}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {divisions: store.publication.divisions};
}
let mapDispatchToProps = {savePublicationDivisions};
export default connect(mapStateToProps, mapDispatchToProps)(DivisionSelector);
