import {Component, Fragment} from 'react';
import {FormRadio} from "shards-react";
import RadioGroup from "../radioGroup";
import {saveArticleType, savePublicationRefereed} from "../redux/actions";
import {connect} from "react-redux";

class ReferredArticle extends Component {

    render() {
        return (
            <Fragment>
                <div>
                    <h6 style={{marginRight: 20, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Refereed:</h6>
                    <RadioGroup selectedId={this.props.selectedRefereed} inline={true} enableTooltip={false} radioArray={[{
                        name: 'Yes, this version has been refereed.',
                        id: 'yes'
                    }, {
                        name: 'No, this version has not been refereed.',
                        id: 'no'
                    }]} onSelected={(selectedId) => this.props.savePublicationRefereed(selectedId)}/>
                </div>
            </Fragment>

        )
    }
}

let mapStateToProps = (store) => {
    return {selectedRefereed: store.publication.selectedRefereed};
}
let mapDispatchToProps = {savePublicationRefereed};
export default connect(mapStateToProps, mapDispatchToProps)(ReferredArticle);