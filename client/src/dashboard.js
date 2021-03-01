import {Component, Fragment} from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import Footer from "./footer";
import Article from "./artile";

class Dashboard extends Component {
    state = {
        loggedUser: null
    }

    static getDerivedStateFromProps(newProps, prevState) {
        return {loggedUser: newProps.loggedUser};
    }

    render() {
        return (
            <Fragment>
                <Card style={{margin: 30}}>
                    <CardHeader>
                        <Button theme="danger">Logout</Button>
                    </CardHeader>
                    <CardBody>
                        <Article loggedUser={this.state.loggedUser}/>
                    </CardBody>
                    <Footer/>
                </Card>
            </Fragment>
        )
    }
}

export default Dashboard;
