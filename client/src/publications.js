import {Component, Fragment} from 'react';
import {List} from "react-content-loader";
import axios from "axios";
import {connect} from "react-redux";
import PublicationDetail from "./publication/publicationDetail";

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
            <PublicationDetail type={item.type} title={item.title} authors={item.creators} isApproved={item.isApproved} publicationId={item.id}/>
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
