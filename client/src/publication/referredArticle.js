import {Component, Fragment} from 'react';
import {FormRadio} from "shards-react";
import RadioGroup from "../radioGroup";

class ReferredArticle extends Component {
    state = {
        selectedRefereed: ''
    }

    render() {
        return (
            <Fragment>
                <div>
                    <h6 style={{marginRight: 20, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Refereed:</h6>
                    <RadioGroup inline={true} enableTooltip={false} radioArray={[{
                        name: 'Yes, this version has been refereed.',
                        id: 'yes'
                    }, {
                        name: 'No, this version has not been refereed.',
                        id: 'no'
                    }]} onSelected={() => {
                    }}/>
                </div>
            </Fragment>

        )
    }
}

export default ReferredArticle;