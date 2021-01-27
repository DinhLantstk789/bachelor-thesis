import {Component, Fragment} from 'react';

class Header extends Component {
    render(){
        return (
            <div>
                <div className="row breadcrumbs margin-bottom-40">
                    <div className="container">
                        <div className="col-md-4 col-sm-4">
                            <h1>Sun Sun Shop</h1>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <ul className="pull-right breadcrumb">
                                <li><a href="index.html">Home</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
