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
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
            },
            {
                title: 'The Evolution of a Cybercrime Market Through two Decades',
                authors: 'Anh V. Vu, Jack Huges, Ildiko Pete, Ben Collier, Yi Ting Chua, Alice Hutchings'
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
                    <Row className='pull-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 23}} className='fa fa-eye'/>
                        <i style={{fontSize: 23, marginLeft: 20}} className='fa fa-edit'/>
                        <i style={{fontSize: 23, marginLeft: 20}} className='fa fa-trash-o'/>
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