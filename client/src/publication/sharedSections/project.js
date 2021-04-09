import {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationProjects} from "../../redux/actions";

export default function Project() {
    const projects = useSelector(store => store.publication.projects);
    const dispatch = useDispatch();
    return (
        <Fragment>
            <div style={{marginTop: 20}}><h6>Projects &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                dispatch(savePublicationProjects(projects.concat({projectName: ''})))
            }}/></h6></div>
            {projects.map((item, index) => (
                <Row style={{marginTop: 10}}>
                    <Col sm={11}>
                        <Row>
                            <Col><FormInput placeholder="Project Name" value={item.projectName} valid={item.projectName.length > 5} onChange={(e) => {
                                projects[index].projectName = e.target.value;
                                dispatch(savePublicationProjects(projects));
                                this.forceUpdate()
                            }}/></Col>
                        </Row>
                    </Col>
                        <Col sm={1}>
                            <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                                dispatch(savePublicationProjects(projects.filter((value, key) => key !== index)))
                            }/>
                        </Col>
                    </Row>
                ))}
            </Fragment>
        )
}
