import {Component, Fragment} from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="row breadcrumbs margin-bottom-40">
                    <div className="container">
                        <div className="col-md-4 col-sm-4">
                            <h1 id="logo">Eprints</h1>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <ul className="pull-right breadcrumb">
                                {/*<li><a href="index.html">Login</a></li>*/}
                                {/*<a href="#" className="btn blue">Login <i className="fa fa-user"></i></a>*/}
                                <a href="#" className="btn blue"><i className="fa fa-user"></i> Login</a>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar">
                        <a href="#home">Home</a>
                        <a href="#news">About</a>
                        <div className="dropdown">
                            <button className="dropbtn">Browse
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a href="#">Browse by Year</a>
                                <a href="#">Browse by Subject</a>
                                <a href="#">Browse by Division</a>
                                <a href="#">Browse by Author</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
