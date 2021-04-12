import React, {Component, Fragment} from 'react';
import {Badge} from "shards-react";
import {savePublicationSubjects} from "../../redux/actions";
import {connect} from "react-redux";

class Subject extends Component {
    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}>
                    <h6>Subjects</h6>
                    {this.props.subjects.map((item, index) => (
                        <Badge style={{marginLeft: 10, marginTop: 10, paddingLeft: 10, paddingRight: 10}} pill theme={item.isEnable ? 'primary' : 'light'} onClick={() => {
                            let currentSubjects = this.props.subjects;
                            currentSubjects[index].isEnable = !currentSubjects[index].isEnable;
                            savePublicationSubjects(currentSubjects);
                            this.forceUpdate();
                        }}>
                            {item.name}
                        </Badge>
                    ))}
                </div>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {subjects: store.publication.subjects};
}
let mapDispatchToProps = {savePublicationSubjects};
export default connect(mapStateToProps, mapDispatchToProps)(Subject);