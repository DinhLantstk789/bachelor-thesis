import {Component, Fragment} from 'react';
import {Badge, Col, FormCheckbox, Row} from "shards-react";
import axios from "axios";
import {connect} from "react-redux";

class PublicationDetail extends Component {
    state = {
        isApproved: false
    }

    parseAuthors(creators) {
        let finalAuthors = '';
        creators.forEach(c => finalAuthors += c.givenName + ' ' + c.familyName + ', ');
        return finalAuthors.substring(0, finalAuthors.length - 2);
    }

    constructor(props) {
        super(props);
        this.state.isApproved = props.isApproved;
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col md={8}>
                        <Row style={{marginLeft: 0}}>
                            <h6 onClick={() => {
                                const body = {
                                    id: this.props.publicationId,
                                    accessToken: this.props.loggedUser.accessToken,
                                }

                                axios.post('http://localhost:1234/article/view',body).then(res => {
                                    let status = res.data.status;
                                    console.log(res.data.status);
                                    if (status === 200) {
                                        // this.setState({publications: res.data.publications}, () => {
                                        //     this.setState({isLoading: true});
                                        // });
                                        console.log(res.data.publications);
                                    } else {
                                        console.log('error:', res.data.message)
                                    }
                                })
                            }}><Badge theme="primary" style={{marginRight: 8}}>
                                {this.props.type}
                            </Badge>{this.props.title}</h6>
                        </Row>
                        <Row style={{marginLeft: 0, marginTop: -10}}>
                            <p style={{fontSize: 14}}>{this.parseAuthors(this.props.authors)}</p>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                            <i style={{fontSize: 20}} className='fa fa-eye'/>
                            <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'/>
                            <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash'/>
                            <FormCheckbox toggle checked={this.state.isApproved} onChange={() => {
                                this.setState({
                                    isApproved: !this.state.isApproved
                                });
                            }}>
                            </FormCheckbox>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {loggedUser: store.user.loggedUser
    };
}
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PublicationDetail);
