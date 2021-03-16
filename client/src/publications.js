import {Component, Fragment} from 'react';
import {Row, Col} from "shards-react";
import {List} from "react-content-loader";

class Publications extends Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 1000);
    }

    render() {
        let publications = [
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            },
            {
                title: 'Formal Analysis of Database Trigger Systems Using Event-B',
                authors: 'Le, Hong Anh and To, Van Khanh and Truong, Ninh Thuan'
            }
        ]
        let loading = <div>
            <List/>
            <List style={{marginTop: 20}}/>
        </div>
        let result = publications.map(item => (
            <Row>
                <Col md={8}>
                    <Row style={{marginLeft: 0}}>
                        <h6>{item.title}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{item.authors}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20}} className='fa fa-eye'/>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit'/>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-trash'/>
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

export default Publications;