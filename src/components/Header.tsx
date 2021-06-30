import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg justify-content-end">
            <div className="container">
                {/* logo */}
                <Link className="text-decoration-none" to="/">
                    <div className="navbar-brand fw-bold logo_size text_black" style={{marginRight: 'auto'}}>
                        {/*<img src={logo} className="d-inline-block align-top" alt="" width={30} height={30} />*/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                            <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                            <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                        </svg>
                        &nbsp; TypeFast
                    </div>
                </Link>
                {/* menu */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="text-decoration-none" to="/test">
                                <span className="nav-link text_black">Try it</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none" to="/about_us">
                                <span className="nav-link text_black">About Us</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none" to="/sign_up">
                                <span className="nav-link text_black">Sign Up</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* menu button */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
        </nav>
    );
}

export default Header;
