import {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Col, FormInput, Row} from "shards-react";
import {savePublicationFunders} from "../../redux/actions";

class Funder extends Component {

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 20}}><h6>Funders &nbsp;<i className='fa fa-plus-circle' onClick={() => {
                    this.props.savePublicationFunders(this.props.funders.concat({funder: ''}))
                }}/></h6></div>
                {this.props.funders.map((item, index) => (
                    <Row style={{marginTop: 10, paddingRight: 20}}>
                        <Col><FormInput placeholder="Funder" value={item.funder} valid={item.funder.length > 5} onChange={(e) => {
                            let funders = this.props.funders;
                            funders[index].funder = e.target.value;
                            this.props.savePublicationFunders(funders);
                            this.forceUpdate()
                        }}/></Col>
                        <i className="fa fa-times-circle" style={{fontSize: 22, marginTop: 10}} onClick={() =>
                            this.props.savePublicationFunders(this.props.funders.filter((value, key) => key !== index))
                        }/>
                    </Row>
                ))}
            </Fragment>
        )
    }
}
let mapStateToProps = (store)=>{
    return{ funders:store.publication.funders}
} ;
let mapDispatchToProps = {savePublicationFunders};
export default connect(mapStateToProps, mapDispatchToProps)(Funder);



