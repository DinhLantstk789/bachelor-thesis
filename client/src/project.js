import {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import { savePublicationProjects} from "./redux/actions";

class Project extends Component {
    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Projects &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    this.props.savePublicationProjects(this.props.projects.concat({projectName: ''}))
                }}/></h6></div>
                {this.props.projects.map((item, index) => (
                    <Row style={{marginTop: 10}}>
                        <Col sm={11}>
                            <Row>
                                <Col><FormInput placeholder="Project Name" value={item.projectName} valid={item.projectName.length > 5} onChange={(e) => {
                                    let projects = this.props.projects;
                                    projects[index].projectName = e.target.value;
                                    this.props.savePublicationProjects(projects);
                                    this.forceUpdate()
                                }}/></Col>
                            </Row>
                        </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                this.props.savePublicationProjects(this.props.projects.filter((value, key) => key !== index))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {projects: store.publication.projects};
}
let mapDispatchToProps = {savePublicationProjects};
export default connect(mapStateToProps, mapDispatchToProps)(Project);