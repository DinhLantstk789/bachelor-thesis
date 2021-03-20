import {Component, Fragment} from 'react';
import {Badge, Col, FormCheckbox, Row} from "shards-react";
import {List} from "react-content-loader";
import axios from "axios";
import {connect} from "react-redux";

class Publications extends Component {
    state = {
        isLoading: true,
        publications: []
    }

    componentDidMount() {
        axios.post('http://localhost:1234/article/fetch', {accessToken: this.props.loggedUser.accessToken}).then(res => {
            let status = res.data.status;
            if (status === 200) {
                this.setState({publications: res.data.publications}, () => {
                    this.setState({isLoading: false});
                });
            } else {
                console.log('error:', res.data.message)
            }
        })
    }

    render() {

        let loading = <div>
            <List/>
            <List style={{marginTop: 20}}/>
        </div>
        let result = this.state.publications.map(item => (
            <Row>
                <Col md={8}>
                    <Row style={{marginLeft: 0}}>
                        <h6><Badge theme="primary" style={{marginRight: 8}}>
                            {item.type}
                        </Badge>{item.title}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{item.authors}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20}} className='fa fa-eye'/>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'/>
                        <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash'/>
                        <FormCheckbox
                            toggle checked={this.state.approved} onChange={() => {
                            this.setState({
                                approved: !this.state.approved
                            });
                        }}>
                        </FormCheckbox>
                    </Row>
                </Col>
            </Row>
        ))

        return (
            <Fragment>
                {this.state.isLoading ? loading : result}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {loggedUser: store.user.loggedUser};
}
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Publications);
