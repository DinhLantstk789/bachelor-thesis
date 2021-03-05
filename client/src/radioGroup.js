import {Component, Fragment} from 'react';
import {Tooltip, FormRadio} from "shards-react";

class RadioGroup extends Component {
    state = {
        selectedId: null
    }

    constructor(props) {
        super(props);
        this.state.selectedId = this.props.radioArray[0].id;
    }

    toggle = (pos) => {
        const newState = {};
        newState[pos] = !this.state[pos];
        this.setState({...this.state, ...newState});
    }

    render() {
        return (
            <Fragment>
                {this.props.radioArray.map((radioElement) => (
                    <div>
                        <label id={radioElement.id} style={{paddingRight: 10}}>
                            <FormRadio
                                name={radioElement.id}
                                checked={this.state.selectedId === radioElement.id}
                                onChange={() => {
                                    this.setState({selectedId: radioElement.id});
                                    this.props.onSelected(radioElement.id);
                                }}>
                                {radioElement.name}
                            </FormRadio>
                        </label>
                        {this.props.enableTooltip ? <Tooltip
                            placement="right" style={{maxWidth: 900}}
                            open={this.state[radioElement.id + 'Open']}
                            target={"#" + radioElement.id}
                            toggle={() => this.toggle(radioElement.id + 'Open')}>
                            {radioElement.tooltip}
                        </Tooltip> : ''}
                    </div>
                ))}
            </Fragment>
        )
    }
}

export default RadioGroup;
