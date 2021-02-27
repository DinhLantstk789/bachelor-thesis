import {Component, Fragment} from 'react';

class Header extends Component {
    render() {
        return (
            <Fragment>
                <div className="header navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button className="navbar-toggle btn navbar-btn" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand logo-v1" href="index.html">
                                <img src="assets/img/logo_blue.png" id="logoimg" alt=""/>
                            </a>
                        </div>

                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Home
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="index.html">Home Default</a></li>
                                        <li><a href="page_home_fixed_header.html">Header Fixed</a></li>
                                        <li><a href="page_home2.html">Home with Top Bar</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-delay="0" data-close-others="false" data-target="#" href="#">
                                        Mega Menu
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="mega-menu">
                                        <li>
                                            <div className="nav-content">
                                                <div className="nav-content-col">
                                                    <h3>Footwear</h3>
                                                    <ul>
                                                        <li><a href="#">Astro Trainers</a></li>
                                                        <li><a href="#">Basketball Shoes</a></li>
                                                        <li><a href="#">Boots</a></li>
                                                        <li><a href="#">Canvas Shoes</a></li>
                                                        <li><a href="#">Football Boots</a></li>
                                                        <li><a href="#">Golf Shoes</a></li>
                                                        <li><a href="#">Hi Tops</a></li>
                                                        <li><a href="#">Indoor and Court Trainers</a></li>
                                                    </ul>
                                                </div>
                                                <div className="nav-content-col">
                                                    <h3>Clothing</h3>
                                                    <ul>
                                                        <li><a href="#">Base Layer</a></li>
                                                        <li><a href="#">Character</a></li>
                                                        <li><a href="#">Chinos</a></li>
                                                        <li><a href="#">Combats</a></li>
                                                        <li><a href="#">Cricket Clothing</a></li>
                                                        <li><a href="#">Fleeces</a></li>
                                                        <li><a href="#">Gilets</a></li>
                                                        <li><a href="#">Golf Tops</a></li>
                                                    </ul>
                                                </div>
                                                <div className="nav-content-col">
                                                    <h3>Accessories</h3>
                                                    <ul>
                                                        <li><a href="#">Belts</a></li>
                                                        <li><a href="#">Caps</a></li>
                                                        <li><a href="#">Gloves, Hats and Scarves</a></li>
                                                    </ul>

                                                    <h3>Clearance</h3>
                                                    <ul>
                                                        <li><a href="#">Jackets</a></li>
                                                        <li><a href="#">Bottoms</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Pages
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="page_about.html">About Us</a></li>
                                        <li><a href="page_services.html">Services</a></li>
                                        <li><a href="page_prices.html">Prices</a></li>
                                        <li><a href="page_faq.html">FAQ</a></li>
                                        <li><a href="page_gallery.html">Gallery</a></li>
                                        <li><a href="page_search_result.html">Search Result</a></li>
                                        <li><a href="page_404.html">404</a></li>
                                        <li><a href="page_500.html">500</a></li>
                                        <li><a href="page_login.html">Login Page</a></li>
                                        <li><a href="page_signup.html">Signup Page</a></li>
                                        <li><a href="page_careers.html">Careers</a></li>
                                        <li><a href="page_contacts.html">Contact</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown active">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Features
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="feature_typography.html">Typography</a></li>
                                        <li className="active"><a href="feature_buttons.html">Buttons</a></li>
                                        <li><a href="feature_forms.html">Forms</a></li>
                                        <li><a href="feature_icons.html">Icons</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Portfolio
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="portfolio_4.html">Portfolio 4</a></li>
                                        <li><a href="portfolio_3.html">Portfolio 3</a></li>
                                        <li><a href="portfolio_2.html">Portfolio 2</a></li>
                                        <li><a href="portfolio_item.html">Portfolio Item</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Blog
                                        <i className="fa fa-angle-down"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="blog.html">Blog Page</a></li>
                                        <li><a href="blog_item.html">Blog Item</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Header;
