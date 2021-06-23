import React from 'react';
import logo from '../images/logo512.png'
import login_icon from '../images/login.png'
function Header(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
            {/* logo */}
            <a className="navbar-brand fw-bold logo_size" href="#" style={{marginRight: 'auto'}}>
            <img src={logo} className="d-inline-block align-top" alt="" width={30} height={30} />
            Type<span className="text_purple">Fast</span>
            </a>
            {/* menu */}
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            </div>
            {/* profile icon */}
            <a className="navbar-brand logo_size" href="#">
            <img src={login_icon} className="d-inline-block align-top" style={{float: 'right'}} width={30} height={30} />
            </a>
            {/* menu button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
        </nav>
    );
}

export default Header;