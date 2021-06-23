import React from 'react';

function Footer(){
    return(
        <footer className="text-center text-lg-start bg-orange">
            <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
            © 2021 Copyright:
            <a className="text-reset fw-bold" href="https://github.com/rekjef">
                Type<span className="text_purple">Fast</span>
            </a>
            </div>
        </footer>
    );
}

export default Footer;