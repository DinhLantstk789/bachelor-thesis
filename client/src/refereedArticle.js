import {Component, Fragment} from 'react';
import {FormRadio} from "shards-react";

class RefereedArticle extends Component {
    state={
        selectedRefereed: ''
    }
    constructor(props) {
        super(props);
        this.changeRefereed = this.changeRefereed.bind(this)
    }
    changeRefereed(refereed) {
        this.setState({
            selectedRefereed: refereed
        });
    }
    render() {
        return (
            <Fragment>
                <label>Refereed</label>
                <div>
                    <FormRadio
                        inline
                        name="refereed"
                        checked={this.state.selectedStatus === "yes"}
                        onChange={() => {
                            this.changeStatus("yes");
                        }}
                    >
                        Yes, this version has been refereed.
                    </FormRadio>
                    <FormRadio
                        inline
                        name="refereed"
                        checked={this.state.selectedStatus === "no"}
                        onChange={() => {
                            this.changeStatus("no");
                        }}
                    >
                        No, this version has not been refereed.
                    </FormRadio>
                </div>
            </Fragment>

        )
    }
}

export default RefereedArticle;